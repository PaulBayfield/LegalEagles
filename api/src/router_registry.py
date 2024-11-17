from api.src.endpoints import upload_documents
from typing import Any, Dict, List
def get_router_registry() -> List[Dict[str,Any]]:
    return [
        {
            "router": upload_documents.router,
            "tags": ["upload_documents"],
        }
    ]