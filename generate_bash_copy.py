import json

def main():
    try:
        with open('migration_file_mapping.json', 'r') as f:
            mapping = json.load(f)
    except Exception as e:
        print(f"Error loading mapping: {e}")
        return

    with open('copy_images.sh', 'w') as f:
        f.write("#!/bin/bash\n")
        f.write("# This script safely copies all images to their new clean names\n\n")
        
        for old_file, new_file in mapping.items():
            # Using copy (-p preserves timestamps, -n no overwrite just in case)
            f.write(f"cp -pn '{old_file}' '{new_file}'\n")

    print(f"- Generated 'copy_images.sh' for {len(mapping)} files.")
    print("  You can run this script directly on your VPS image directory.")

if __name__ == '__main__':
    main()
