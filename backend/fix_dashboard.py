with open('main.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and fix the dashboard stats function
fixed_lines = []
i = 0
while i < len(lines):
    if 'async def get_dashboard_stats():' in lines[i]:
        # Add the function def
        fixed_lines.append(lines[i])
        i += 1
        # Add return statement if missing
        if i < len(lines) and 'return' not in lines[i]:
            fixed_lines.append('    return {\n')
        # Continue adding lines until we find the end
        while i < len(lines):
            fixed_lines.append(lines[i])
            if '"discharge_rate": 8.3' in lines[i]:
                # Check if next line has closing brace
                if i + 1 < len(lines) and '}' not in lines[i + 1]:
                    fixed_lines.append('    }\n')
                break
            i += 1
    else:
        fixed_lines.append(lines[i])
    i += 1

with open('main.py', 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print("✅ Fixed dashboard stats function!")
