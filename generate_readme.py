import os

# List of folders to process
folders = ['active', 'notactive', 'draft', 'onetime']

# Base GitHub URL for your repository
base_url = "https://github.com/alitaantony/EmailTempsComms/tree/main/"

# HTML styling for the tables
table_style = "width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;"
header_style = "background-color: #f4f4f4; text-align: left; padding: 8px; border: 1px solid #ddd;"
cell_style = "padding: 8px; border: 1px solid #ddd;"

def generate_html_table(folder):
    html = f"<h3>{folder.capitalize()} Files</h3>\n"
    html += f'<table style="{table_style}">\n'
    html += "  <thead>\n    <tr>\n"
    html += f'      <th style="{header_style}">Type</th>\n'
    html += f'      <th style="{header_style}">Title</th>\n'
    html += f'      <th style="{header_style}">Context</th>\n'
    html += f'      <th style="{header_style}">Link</th>\n'
    html += "    </tr>\n  </thead>\n  <tbody>\n"
    
    # Try to read the folder and add rows for each file
    try:
        folder_path = os.path.join(os.getcwd(), folder)
        files = os.listdir(folder_path)
        for filename in files:
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path):
                title = os.path.splitext(filename)[0]
                html += "    <tr>\n"
                html += f'      <td style="{cell_style}">PLACEHOLDER</td>\n'
                html += f'      <td style="{cell_style}">{title}</td>\n'
                html += f'      <td style="{cell_style}">PLACEHOLDER</td>\n'
                html += f'      <td style="{cell_style}"><a href="{base_url}{folder}/{filename}">Link</a></td>\n'
                html += "    </tr>\n"
    except Exception as e:
        html += "    <tr>\n"
        html += f'      <td style="{cell_style}" colspan="4">Error reading folder "{folder}": {str(e)}</td>\n'
        html += "    </tr>\n"
    
    html += "  </tbody>\n</table>\n"
    return html

def main():
    readme_content = "# Repository Files Overview\n\n"
    for folder in folders:
        readme_content += generate_html_table(folder)
        readme_content += "\n"
    
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(readme_content)
    print("README.md has been updated with tables.")

if __name__ == "__main__":
    main()
