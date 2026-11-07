import shutil
import subprocess
import os

def main():
    root_dir = '/root/Projeler/oguzatalay.work'
    docx_file = os.path.join(root_dir, 'Oguz_Atalay_Master_CV.docx')
    tmp_pdf = '/tmp/Oguz_Atalay_Master_CV.pdf'

    print("Converting DOCX to PDF with LibreOffice...")
    cmd = ['libreoffice', '--headless', '--convert-to', 'pdf', docx_file, '--outdir', '/tmp']
    res = subprocess.run(cmd, capture_output=True, text=True)
    print("LibreOffice output:", res.stdout, res.stderr)

    if not os.path.exists(tmp_pdf):
        raise FileNotFoundError(f"{tmp_pdf} not created!")

    destinations = [
        os.path.join(root_dir, 'public/cv'),
        os.path.join(root_dir, 'cv')
    ]

    for d in destinations:
        os.makedirs(d, exist_ok=True)
        # DOCX copies
        shutil.copy(docx_file, os.path.join(d, 'Oguz_Atalay_CV.docx'))
        shutil.copy(docx_file, os.path.join(d, 'Oguz_Atalay_Master_CV.docx'))
        shutil.copy(docx_file, os.path.join(d, 'Oguz_Atalay_ATS_Harvard_CV_2025.docx'))
        # PDF copies
        shutil.copy(tmp_pdf, os.path.join(d, 'Oguz_Atalay_CV.pdf'))
        shutil.copy(tmp_pdf, os.path.join(d, 'Oguz_Atalay_Master_CV.pdf'))
        shutil.copy(tmp_pdf, os.path.join(d, 'Oguz_Atalay_ATS_Harvard_CV_2025.pdf'))
        print(f"Synced files to {d}")

    print("All master CV files synced successfully!")

if __name__ == '__main__':
    main()
