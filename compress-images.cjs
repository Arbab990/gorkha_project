const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const IMAGES_DIR = path.join(__dirname, "public", "images");
const OUTPUT_DIR = path.join(__dirname, "public", "images", "optimized");

// Hero slider images to compress
const heroImages = [
    "beautiful-scenery-mountainous-landscape-covered-with-snow-cloudy-sky.jpg",
    "pexels-micklatter-31540737.jpg",
    "pexels-micklatter-15519578.jpg",
    "pexels-prabin-adhikari-1090022431-20651038.jpg",
];

// Target: 1920px wide (full HD screens), quality 80 WebP
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function compressImages() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const img of heroImages) {
        const inputPath = path.join(IMAGES_DIR, img);
        const outputName = img.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        const outputPath = path.join(OUTPUT_DIR, outputName);

        if (!fs.existsSync(inputPath)) {
            console.log(`SKIP: ${img} not found`);
            continue;
        }

        const originalSize = fs.statSync(inputPath).size;

        await sharp(inputPath)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

        console.log(
            `${img} -> ${outputName} | ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024 / 1024).toFixed(2)} MB (${reduction}% smaller)`
        );
    }

    console.log("\nDone! Optimized images saved to public/images/optimized/");
}

compressImages().catch(console.error);
