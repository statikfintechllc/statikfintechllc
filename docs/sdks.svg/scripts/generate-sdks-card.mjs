import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT = resolve(__dirname, "../assets/statik.title.svg");
const OUTPUT = resolve(__dirname, "../assets/statik.title.svg");

async function fetchDragonImageAsBase64() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/statikfintechllc/dragon-boot/master/frames/frame_000.png');
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.log('Failed to fetch dragon image, using fallback');
    return 'https://raw.githubusercontent.com/statikfintechllc/dragon-boot/master/frames/frame_000.png';
  }
}

async function updateStatikTitleSVG() {
  try {
    // Read the existing SVG
    const svgContent = await fs.readFile(INPUT, 'utf8');
    
    // Fetch the dragon image as base64
    const dragonImageUrl = await fetchDragonImageAsBase64();
    
    // Replace the external URLs with the base64 version
    const updatedSvg = svgContent
      .replace(
        /href="https:\/\/raw\.githubusercontent\.com\/statikfintechllc\/dragon-boot\/master\/frames\/frame_000\.png"/g,
        `href="${dragonImageUrl}"`
      )
      .replace(
        /xlink:href="https:\/\/raw\.githubusercontent\.com\/statikfintechllc\/dragon-boot\/master\/frames\/frame_000\.png"/g,
        `xlink:href="${dragonImageUrl}"`
      );
    
    return updatedSvg;
  } catch (error) {
    console.error('Error updating SVG:', error);
    throw error;
  }
}

(async () => {
  try {
    const updatedSvg = await updateStatikTitleSVG();
    console.log('Generated SVG length:', updatedSvg.length);
    await fs.writeFile(OUTPUT, updatedSvg);
    console.log("✅ statik.title.svg updated with embedded base64 dragon image!");
    console.log('Output file:', OUTPUT);
  } catch (error) {
    console.error('❌ Failed to update SVG:', error);
  }
})();
