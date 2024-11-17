from fastapi import FastAPI, UploadFile, File, HTTPException
from typing import List
import shutil
import os

app = FastAPI()

# Dossier où les fichiers seront sauvegardés
UPLOAD_FOLDER = "uploaded_files"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.post("/upload/")
async def upload_files(files: List[UploadFile] = File(...)):
    """
    Endpoint pour uploader plusieurs fichiers.
    """
    uploaded_files_info = []

    for file in files:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        
        try:
            # Sauvegarder le fichier
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            uploaded_files_info.append({
                "filename": file.filename,
                "content_type": file.content_type,
                "path": file_path,
            })
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Erreur lors de l'upload du fichier {file.filename}: {str(e)}")
    
    return {"uploaded_files": uploaded_files_info}


@app.get("/")
async def root():
    """
    Endpoint pour vérifier que l'API fonctionne.
    """
    return {"message": "Bienvenue sur l'API d'upload de documents."}