import os

# List of folders to process
folders = ['active', 'notactive', 'draft', 'onetime']

# Base GitHub URL for your repository
base_url = "https://github.com/alitaantony/EmailTempsComms/tree/main/"

# Default rows for the 'active' folder (example rows)
default_rows = {
    'active': [
        ("Cron", "16 Hour Before Event Start Time: RSVP Mail", "PLACEHOLDER"),
        ("Trigger", "Event Application accepted", "PLACEHOLDER"),
        ("Trigger", "Event Application rejected", "PLACEHOLDER"),
    ]
}

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
    html += f'      <th style="{header_style}">Links</th>\n'
    html += "    </tr>\n  </thead>\n  <tbody>\n"

    # Add default rows for the 'active' folder if available
    if folder in default_rows:
        for row in default_rows[folder]:
            html += "    <tr>\n"
            html += f'      <td style="{cell_style}">{row[0]}</td>\n'
            html += f'      <td style="{cell_style}">{row[1]}</td>\n'
            html += f'      <td style="{cell_style}">{row[2]}</td>\n'
            html += f'      <td style="{cell_style}"><a href="{base_url}{folder}">Link</a></td>\n'
            html += "    </tr>\n"

    # Attempt to read the folder and list its files
    folder_path = os.path.join(os.getcwd(), folder)
    try:
        if os.path.exists(folder_path):
            file_list = os.listdir(folder_path)
        else:
            raise FileNotFoundError(f"Folder '{folder}' not found.")
    except Exception as e:
        html += "    <tr>\n"
        html += f'      <td style="{cell_style}" colspan="4">Error reading folder: {e}</td>\n'
        html += "    </tr>\n"
        html += "  </tbody>\n</table>\n"
        return html

    # Add a row for each file in the folder, only if the file exists
    for filename in file_list:
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            title = os.path.splitext(filename)[0]
            html += "    <tr>\n"
            html += f'      <td style="{cell_style}">PLACEHOLDER</td>\n'
            html += f'      <td style="{cell_style}">{title}</td>\n'
            html += f'      <td style="{cell_style}">PLACEHOLDER</td>\n'
            html += f'      <td style="{cell_style}"><a href="{base_url}{folder}/{filename}">Link</a></td>\n'
            html += "    </tr>\n"
    html += "  </tbody>\n</table>\n"
    return html

def main():
    # Start the README with a header
    readme_content = "# Repository Files Overview\n\n"
    
    # Generate and append a table for each folder
    for folder in folders:
        readme_content += generate_html_table(folder)
        readme_content += "\n"  # Extra newline for separation
    
    # Write the content to README.md
    try:
        with open("README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
        print("README.md has been updated with stylish tables.")
    except Exception as e:
        print(f"Error writing to README.md: {e}")

if __name__ == "__main__":
    main()
