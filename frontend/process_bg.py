from rembg import remove
from PIL import Image
import os

images = ["ironman.png", "superman.png", "batman.png", "hulk.png", "spiderman.jpg"]
for img_name in images:
    input_path = f"public/{img_name}"
    output_path = f"public/{img_name.split('.')[0]}_rm.png" # output with _rm
    
    print(f"Processing {img_name}...")
    try:
        input_img = Image.open(input_path)
        output_img = remove(input_img)
        output_img.save(output_path)
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Error processing {img_name}: {e}")
