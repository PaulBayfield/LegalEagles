from llama_index.core import SimpleDirectoryReader, StorageContext, VectorStoreIndex, Settings
from llama_index.vector_stores.postgres import PGVectorStore
from llama_index.embeddings.mistralai import MistralAIEmbedding
from llama_index.llms.mistralai import MistralAI
import psycopg2
import json

with open('./profile.json', 'r') as file :
    config = json.loads(file.read())

# # Setup Mistral

mistral_api_key = config['MISTRAL_API_KEY']

embed_model = MistralAIEmbedding(
    api_key=mistral_api_key,
    model_name='mistral-embed',
    embed_batch_size=42
)

Settings.embed_model = embed_model
Settings.llm = MistralAI(
    api_key=mistral_api_key,
    model='open-mistral-nemo-latest'
)

# Get document

documents = SimpleDirectoryReader('./data').load_data()

# Split documents into chunks


print('Document Id:', documents[0].doc_id)


# Connection to db

connection_string=config['NEON_STRING']
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
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context
)

# query_engine = index.as_query_engine()