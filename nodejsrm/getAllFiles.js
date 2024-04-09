import fs from "fs";
import path from "path";

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(
        path.resolve(dirPath, file.name),
        arrayOfFiles
      );
    } else {
      arrayOfFiles.push(path.resolve(dirPath, file.name));
    }
  });
  return arrayOfFiles;
}

console.log(getAllFiles("./"));
