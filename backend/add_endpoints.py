import re

# Read main.py
with open('main.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Read endpoints
with open('report_endpoints.py', 'r', encoding='utf-8') as f:
    endpoints = f.read()

# Clean up endpoints (remove comments and triple quotes)
endpoints_clean = endpoints.replace('# Additional API endpoints for reports\n# Add this to the end of main.py before if __name__ == "__main__":\n\n"""', '')
endpoints_clean = endpoints_clean.replace('"""', '')

# Find position before if __name__
match = re.search(r'\nif __name__', content)
if match:
    # Insert endpoints
    new_content = content[:match.start()] + '\n' + endpoints_clean + '\n' + content[match.start():]
    
    # Write back
    with open('main.py', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print('✅ Report endpoints added successfully to main.py!')
else:
    print('❌ Could not find if __name__ block')
