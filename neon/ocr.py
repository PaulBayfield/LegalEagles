from pdf2image import convert_from_path
from pytesseract import image_to_string

def extract_from_pdf(path_in) :
    pages = convert_from_path(path_in)

    text = ''
    
    for image in pages :
        text += +image_to_string(image)+'\n'
    
    return text


print(extract_from_pdf('./data/document-1.pdf'))