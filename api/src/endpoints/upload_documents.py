from typing import List
from fastapi import  APIRouter,UploadFile, File
from logic.document_uploader import DocumentUploader
import logging
from llama_index.core import SimpleDirectoryReader, StorageContext, VectorStoreIndex, Settings
from llama_index.vector_stores.postgres import PGVectorStore
from llama_index.embeddings.mistralai import MistralAIEmbedding
from llama_index.llms.mistralai import MistralAI
import psycopg2
from llama_index.core.schema import Node

from logic.rag import compute_nodes
logger = logging.getLogger(__name__)
# Create the APIRouter instance
router = APIRouter()

@router.post("/upload/")
async def upload_files(files: List[UploadFile] = File(description="Attorney documents to upload"), prompt: str = ""):
    """
    Endpoint pour uploader plusieurs fichiers.
    """
   
    doc_uploader = DocumentUploader()
    logger.info("saving files ...")
    doc_uploader.save_files(files)
   
    logging.info("setup mistral ...")
    # # Setup Mistral
    mistral_api_key = 'BejQ8RH9xlmkNjIn6w9o6q4wYMN3La9U'
    embed_model = MistralAIEmbedding(
        api_key=mistral_api_key,
        model_name='mistral-embed',
        embed_batch_size=42
    )
    Settings.embed_model = embed_model
    Settings.llm = MistralAI(
        api_key=mistral_api_key,
        model='mistral-large-latest'
    )
    # Get document

    documents = SimpleDirectoryReader(doc_uploader.folder_root).load_data()
    nodes_lst = await compute_nodes(documents =documents)                    
    logger.info('building index ...')
    
    

    # Split documents into chunks
    connection_string="postgresql://neondb_owner:XKjDcabgn15k@ep-hidden-grass-a2zaqmsr.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    db_name='test_db'
    table_name='docs'
    conn = psycopg2.connect(connection_string)
    conn.autocommit = True

    # Test connection (marche bien)
    with conn.cursor() as c:
        c.execute(f"DROP DATABASE IF EXISTS {db_name}")
        c.execute(f"CREATE DATABASE {db_name}")


    # Creating the index
    vectore_store = PGVectorStore.from_params(
        port=5432,
        connection_string=connection_string,
        table_name=table_name,
        embed_dim=1024 # Dimension d'embedding de mistral
    )

    storage_context = StorageContext.from_defaults(vector_store=vectore_store)
    index = VectorStoreIndex( 
        nodes = nodes_lst,
        # vector store index params
        use_async = False,
        embed_model= embed_model,
        storage_context=storage_context,
        insert_batch_size=15)
    
    rag = index.as_query_engine()
    prompt = prompt
    response = rag.query(prompt).response    
        
    return response