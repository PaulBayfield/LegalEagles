import tempfile
from pathlib import Path
import os
import shutil
from fastapi import UploadFile
from PyPDF2 import PdfReader, PdfWriter

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

    # def save_files(self, files: list[UploadFile]) -> None:
    #     self.create_folder()
    #     for file in files:
    #         file_path = os.path.join(self.folder_root, file.filename)
    #         with open(file_path, "wb") as buffer:
    #             shutil.copyfileobj(file.file, buffer)

    def save_files(self, files: list[UploadFile]) -> None:
        self.create_folder()  # Ensure the folder exists
        for file in files:
            file_path = os.path.join(self.folder_root, file.filename)
            
            # Save the original PDF first
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            # Now process the PDF to save each page separately
            reader = PdfReader(file_path)
            for page_number, page in enumerate(reader.pages):
                writer = PdfWriter()
                writer.add_page(page)
                
                # Save each page to its own file
                page_file_path = os.path.join(self.folder_root, f"{file.filename}_page_{page_number + 1}.pdf")
                with open(page_file_path, "wb") as page_file:
                    writer.write(page_file)
            
            # After all pages are saved, remove the original PDF
            os.remove(file_path)
