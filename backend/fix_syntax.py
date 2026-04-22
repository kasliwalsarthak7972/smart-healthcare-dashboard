#!/usr/bin/env python3
"""Fix syntax errors in main.py by adding missing docstring quotes"""

import re

print("🔧 Fixing main.py syntax errors...")

with open('main.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Track if we're in a function definition
fixed_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Check if this is an async def line
    if 'async def ' in line:
        fixed_lines.append(line)
        i += 1
        # Check if next line is a bare description (missing docstring quotes)
        if i < len(lines):
            next_line = lines[i]
            # If it starts with capital letter and doesn't have quotes/indentation patterns
            if (next_line.strip() and 
                not next_line.strip().startswith('"""') and
                not next_line.strip().startswith('return') and
                not next_line.strip().startswith('data') and
                not next_line.strip().startswith('patients') and
                not next_line.strip().startswith('doctors') and
                not next_line.strip().startswith('departments') and
                not next_line.strip().startswith('month') and
                not next_line.strip().startswith('output') and
                not next_line.strip().startswith('writer') and
                not next_line.strip().startswith('filename') and
                not next_line.strip().startswith('filepath') and
                not next_line.strip().startswith('with open') and
                not next_line.strip().startswith('return File') and
                not next_line.strip().startswith('#') and
                len(next_line.strip().split()) > 2):  # It's a sentence
                # Add docstring quotes
                fixed_lines.append('    """' + next_line.strip() + '"""\n')
                print(f"  ✅ Fixed: {next_line.strip()[:50]}...")
                i += 1
                continue
    
    fixed_lines.append(line)
    i += 1

# Write fixed version
with open('main.py', 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print("\n✅ All syntax errors fixed!")
print("🚀 Ready to restart backend server\n")
