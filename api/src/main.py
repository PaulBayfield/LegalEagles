from fastapi import FastAPI
import os

app = FastAPI()

# Dossier où les fichiers seront sauvegardés
RAG_FOLDER = "/app/tmp/rag_folder"
os.makedirs(RAG_FOLDER, exist_ok=True)

#to be handled later as it is no good like this
from endpoints.upload_documents import router as upload_router
app.include_router(upload_router, prefix="/api/v1", tags=["Upload"])



