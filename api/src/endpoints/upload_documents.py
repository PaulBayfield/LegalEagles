from typing import List
import shutil
from main import RAG_FOLDER
from fastapi import  APIRouter,UploadFile, File, HTTPException
import os
# Create the APIRouter instance
router = APIRouter()

@router.post("/upload/")
async def upload_files(files: List[UploadFile] = File(...)):
    """
    Endpoint pour uploader plusieurs fichiers.
    """
    uploaded_files_info = []
    # import ipdb
    # ipdb.set_trace()
    for file in files:
        file_path = os.path.join(RAG_FOLDER, file.filename)
        
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