#!/usr/bin/env python3
"""
Create PDF from ERD markdown using HTML intermediate
"""
import subprocess
import sys
import os

def create_pdf_from_html():
    """Create PDF from HTML using macOS built-in tools"""
    html_file = "ERD-v2.html"
    pdf_file = "Dance-Website-ERD-v2.pdf"
    
    if not os.path.exists(html_file):
        print(f"Error: {html_file} not found. Run md_to_html.py first.")
        return False
    
    # Get absolute path
    current_dir = os.getcwd()
    html_path = f"file://{current_dir}/{html_file}"
    pdf_path = f"{current_dir}/{pdf_file}"
    
    # Try using wkhtmltopdf if available
    try:
        subprocess.run(['which', 'wkhtmltopdf'], check=True, capture_output=True)
        print("Using wkhtmltopdf...")
        cmd = [
            'wkhtmltopdf',
            '--page-size', 'A4',
            '--margin-top', '20mm',
            '--margin-right', '20mm',
            '--margin-bottom', '20mm',
            '--margin-left', '20mm',
            '--encoding', 'UTF-8',
            '--print-media-type',
            html_path,
            pdf_path
        ]
        subprocess.run(cmd, check=True)
        print(f"PDF created successfully: {pdf_file}")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    
    # Try using Chrome/Chromium headless
    chrome_paths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        'google-chrome',
        'chromium-browser'
    ]
    
    for chrome_path in chrome_paths:
        try:
            if chrome_path.startswith('/Applications'):
                if not os.path.exists(chrome_path):
                    continue
            else:
                subprocess.run(['which', chrome_path], check=True, capture_output=True)
            
            print(f"Using Chrome/Chromium headless: {chrome_path}")
            cmd = [
                chrome_path,
                '--headless',
                '--disable-gpu',
                '--print-to-pdf=' + pdf_path,
                '--no-margins',
                html_path
            ]
            subprocess.run(cmd, check=True, capture_output=True)
            print(f"PDF created successfully: {pdf_file}")
            return True
        except (subprocess.CalledProcessError, FileNotFoundError, OSError):
            continue
    
    # Fallback: Create instructions for manual conversion
    print("Automatic PDF conversion not available.")
    print("Manual conversion options:")
    print(f"1. Open {html_file} in your browser")
    print("2. Press Cmd+P to print")
    print("3. Choose 'Save as PDF' from the PDF dropdown")
    print(f"4. Save as '{pdf_file}'")
    print()
    print("Or install wkhtmltopdf:")
    print("  brew install wkhtmltopdf")
    print("  Then run this script again")
    
    return False

if __name__ == "__main__":
    success = create_pdf_from_html()
    if success:
        print("PDF generation completed!")
    else:
        print("PDF generation requires manual steps - see instructions above.")
