import {extrudeTilesetToImage} from "tile-extruder";
import {readdirSync} from "fs";
import {join, extname} from "path";


async function main() {
    const workingDir = process.cwd() + "/src/toExtrude";
    const files = readdirSync(workingDir);
    for (let i = 0; i < files.length; i++) {
        const filePath = join(workingDir, files[i]);
        console.log(`File ${i + 1} of ${files.length}`)
        if (extname(filePath.toLowerCase()) !== ".png") {
            console.log(`${filePath} is not a png, skipping...`)
        } else if (filePath.toLowerCase().includes("-extruded")) {
            console.log(`${filePath} includes "-extruded" and will be skipped.`);
            continue;
        }
        const fileOutput = filePath.replace(".png", "-extruded.png")
        console.log(`Input: ${filePath}`);
        try {
            await extrudeTilesetToImage(16, 16,
                filePath, fileOutput
            );
        } catch (e) {
            console.log(`Error processing: ${e}`);
            console.log("Attempting to continue walking through files...");
        }
        console.log(`Output: ${fileOutput}`);
    }
    console.log("\nFinished processing");
}

main();