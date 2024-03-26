import {extrudeTilesetToImage} from "tile-extruder";


async function main() {
    console.log(process.cwd());
    const workingDir = process.cwd()
    const input = workingDir + "/src/util/emerald_tileset.png";
    const output = workingDir + "/src/util/emerald_tileset.png"
    await extrudeTilesetToImage(16, 16,
        input, output
        // "./emerald_tileset.png",
        // "./emerald_tileset.png"
    );
}

main();