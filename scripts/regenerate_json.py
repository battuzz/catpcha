# generate image json

import json
import os
import pathlib


def main():
    json_struct = []
    public_root_path = pathlib.Path("./public")
    image_root_path = public_root_path / "images"

    for image_path in image_root_path.glob("generated_set/*.png"):
        json_struct.append(
            {
                "url": str(image_path.relative_to(public_root_path))
                .removeprefix("./")
                .replace("\\", "/"),
                "generated": True,
            }
        )
    for image_path in image_root_path.glob("real_set/*.png"):
        json_struct.append(
            {
                "url": str(image_path.relative_to(public_root_path))
                .removeprefix("./")
                .replace("\\", "/"),
                "generated": False,
            }
        )

    with open("./app/image_database.json", "w") as f:
        json.dump({"cat_images": json_struct}, f)


if __name__ == "__main__":
    main()
