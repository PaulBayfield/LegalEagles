import tempfile
from pathlib import Path
import os
import shutil
from fastapi import UploadFile

class DocumentUploader:
    def __init__(self):
        self.temp_dir,self.folder_root = self.get_tmp_folder_path()

    def get_tmp_folder_path(self) -> tuple[str,str]:
        temp_dir = tempfile.TemporaryDirectory(dir='/app')
        subfolder_path : str = Path(os.path.join(temp_dir.name, 'rag_folder')
        ).as_posix()
        # os.makedirs(subfolder_path, exist_ok=True)
        return temp_dir, subfolder_path+"/"
    
    def create_folder(self) -> None:
        os.makedirs(self.folder_root, exist_ok=False)

    def save_files(self, files: list[UploadFile]) -> None:
        self.create_folder()
        for file in files:
            file_path = os.path.join(self.folder_root, file.filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
