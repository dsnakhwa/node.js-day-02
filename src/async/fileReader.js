import path from "path";
import fs from "fs/promises";

const filePath = path.resolve('src/assets',"txt_sample_file_5MB.txt");

async function asyncFileReader() {
    try {
        const data = await fs.readFile(filePath, 'UTF-8');
        console.log(data);

    } catch(err) {
        console.error(err);
    }
}

asyncFileReader();
