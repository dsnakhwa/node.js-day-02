import path from "path";
import fs from "fs";

const filePath = path.resolve('src/assets',"txt_sample_file_5MB.txt");

function callbackFileReader() {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    if (data) {
      console.log(data);
    }
  });
}

callbackFileReader();
