import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";


// stream leaks
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

function copyFile() {
  try {
    console.time("copy");

    const readStream = createReadStream("./src/assets/input.txt");
    const writeStream = createWriteStream("./output/output.txt");

    readStream.pipe(upperCaseTransform).pipe(writeStream);

    // "enclosed"
    // 'closed'
    // process.memoryUsage & buffer
    writeStream.on("finish", () => {
      console.timeEnd("copy");
      console.log("File copied successfully ✅");
    });

    readStream.on("error", (err) => console.error("Read error:", err));
    upperCaseTransform.on("error", (err) =>
      console.error("Transform error:", err),
    );
    writeStream.on("error", (err) => console.error("Write error:", err));
  } catch (err) {
    console.error(err);
  }
}

copyFile();
