# Remove duplicate consecutive lines
with open('main.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

fixed = []
for i, line in enumerate(lines):
    # Skip if this line is identical to previous
    if i > 0 and line.strip() == lines[i-1].strip() and line.strip():
        continue
    fixed.append(line)

with open('main.py', 'w', encoding='utf-8') as f:
    f.writelines(fixed)

print(f"Removed {len(lines) - len(fixed)} duplicate lines")
print(f"Original: {len(lines)} lines -> Fixed: {len(fixed)} lines")
