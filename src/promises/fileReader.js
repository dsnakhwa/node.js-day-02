import path from "path";
import fsl from 'fs';
import fs from "fs/promises";

const filePath = path.resolve('src/assets',"txt_sample_file_5MB.txt");

function promiseFileReader() {
    try {
    return fs.readFile(filePath, 'utf-8');
    } catch (err) {
        console.error(err);
    }
}

function promiseWithCallbackFileReader() {
     return new Promise((resolve, reject) => {
        fsl.readFile(filePath, 'utf-8', (err, data) => {
            if(err) {
                reject(err);
                return;
            }
              resolve(data);
        });
    });
}



promiseFileReader()
    .then(data  => console.log(data))
    .catch(err  => console.error(err));

promiseWithCallbackFileReader()
    .then(data  => console.log(data))
    .catch(err  => console.error(err));