#!/usr/bin/env python3
"""
Convert ERD markdown files to HTML format
"""
import os
import markdown
from markdown.extensions import codehilite, tables

def convert_md_to_html(input_file, output_file):
    """Convert a markdown file to HTML"""
    
    # Read the markdown file
    with open(input_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Initialize markdown with extensions
    md = markdown.Markdown(extensions=[
        'markdown.extensions.tables',
        'markdown.extensions.codehilite',
        'markdown.extensions.fenced_code',
        'markdown.extensions.toc'
    ])
    
    # Convert to HTML
    html_content = md.convert(md_content)
    
    # Create a complete HTML document
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dance Website ERD</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }}
        
        h1, h2, h3, h4 {{
            color: #2c3e50;
        }}
        
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }}
        
        th, td {{
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }}
        
        th {{
            background-color: #f8f9fa;
            font-weight: bold;
        }}
        
        pre {{
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 15px;
            overflow-x: auto;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 12px;
            line-height: 1.4;
        }}
        
        code {{
            background-color: #f8f9fa;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Monaco', 'Menlo', monospace;
        }}
        
        .highlight {{
            background-color: #fff3cd;
            padding: 10px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
        }}
        
        ul, ol {{
            margin: 10px 0 10px 20px;
        }}
        
        li {{
            margin: 5px 0;
        }}
        
        @media print {{
            body {{
                font-size: 12px;
                line-height: 1.4;
            }}
            
            pre {{
                font-size: 10px;
                page-break-inside: avoid;
            }}
            
            h1, h2, h3 {{
                page-break-after: avoid;
            }}
        }}
    </style>
</head>
<body>
{html_content}
</body>
</html>"""
    
    # Write the HTML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print(f"Converted {input_file} to {output_file}")

def main():
    """Main function to convert all ERD files"""
    
    # List of ERD files to convert
    erd_files = [
        'ERD.md',
        'ERD-Visual.md',
        'ERD-updated.md',
        'ERD-v2.md'
    ]
    
    for md_file in erd_files:
        if os.path.exists(md_file):
            # Generate output filename
            base_name = os.path.splitext(md_file)[0]
            html_file = f"{base_name}.html"
            
            # Convert the file
            convert_md_to_html(md_file, html_file)
        else:
            print(f"Warning: {md_file} not found")

if __name__ == "__main__":
    main()
