#!/usr/bin/env python3
"""
Convert ERD markdown to styled HTML for PDF generation
"""
import markdown
import re

def convert_md_to_html(input_file, output_file):
    # Read the markdown file
    with open(input_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Configure markdown with extensions
    md = markdown.Markdown(extensions=[
        'markdown.extensions.tables',
        'markdown.extensions.fenced_code',
        'markdown.extensions.toc',
        'markdown.extensions.codehilite'
    ])
    
    # Convert markdown to HTML
    html_content = md.convert(md_content)
    
    # Create full HTML document with styling
    full_html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Dance Website - ERD v2</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }}
        
        h1 {{
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            page-break-before: always;
        }}
        
        h1:first-of-type {{
            page-break-before: avoid;
        }}
        
        h2 {{
            color: #34495e;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 5px;
            margin-top: 30px;
            page-break-after: avoid;
        }}
        
        h3 {{
            color: #7f8c8d;
            margin-top: 25px;
            page-break-after: avoid;
        }}
        
        pre {{
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 15px;
            overflow-x: auto;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 12px;
            line-height: 1.4;
            page-break-inside: avoid;
        }}
        
        code {{
            background-color: #f1f3f4;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 13px;
        }}
        
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 15px 0;
            page-break-inside: avoid;
        }}
        
        th, td {{
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }}
        
        th {{
            background-color: #f2f2f2;
            font-weight: bold;
        }}
        
        ul, ol {{
            padding-left: 20px;
        }}
        
        li {{
            margin-bottom: 5px;
        }}
        
        blockquote {{
            border-left: 4px solid #3498db;
            margin: 15px 0;
            padding-left: 15px;
            color: #7f8c8d;
        }}
        
        .ascii-art {{
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 11px;
            line-height: 1.2;
            white-space: pre;
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            padding: 15px;
            overflow-x: auto;
            page-break-inside: avoid;
        }}
        
        strong {{
            color: #2c3e50;
        }}
        
        @media print {{
            body {{
                margin: 0;
                padding: 15px;
            }}
            
            h1, h2, h3 {{
                page-break-after: avoid;
            }}
            
            pre, .ascii-art {{
                page-break-inside: avoid;
                font-size: 10px;
            }}
            
            table {{
                page-break-inside: avoid;
            }}
        }}
    </style>
</head>
<body>
{html_content}
</body>
</html>
"""
    
    # Fix ASCII art sections (tables/diagrams in code blocks)
    full_html = re.sub(
        r'<pre><code>(.*?┌.*?└.*?)</code></pre>', 
        r'<div class="ascii-art">\1</div>', 
        full_html, 
        flags=re.DOTALL
    )
    
    # Write HTML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print(f"HTML file created: {output_file}")

if __name__ == "__main__":
    convert_md_to_html("ERD-v2.md", "ERD-v2.html")
