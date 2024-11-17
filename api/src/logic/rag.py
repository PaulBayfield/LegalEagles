from llama_index.core.schema import Document, TextNode
from llama_index.core.node_parser import SentenceSplitter
async def compute_nodes(documents):
    """
    Compute nodes from documents
    """
    text_docs = [doc for doc in documents if isinstance(doc, Document)]
    splitter = SentenceSplitter(
        chunk_size=1024,
        chunk_overlap=70,
    )
    text_nodes = []
    for doc in text_docs:
        cur_nodes = splitter.get_nodes_from_documents([doc])
        for cur_node in cur_nodes:
            text_nodes.append(
                TextNode(text = cur_node.text or "None",
                         extra_info = doc.metadata)
            )
        
    return text_nodes