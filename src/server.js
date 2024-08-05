// This is used for getting user input.
import { createInterface } from "readline/promises";

import fs from 'fs';
import path from 'path';
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const bucketName = "tftdle";
const folderPath = path.resolve("../public/images");


const uploadFile = async (filePath, s3Path) => {
  const fileContent = fs.readFileSync(filePath);

  const uploadParams = {
    Bucket: bucketName,
    Key: s3Path,
    Body: fileContent,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log(`Successfully uploaded ${s3Path}`);
  } catch (err) {
    console.error("Error uploading file", err);
  }
}

const uploadFolder = async (folderPath, s3BasePath = "") => {
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);
      const s3Path = path.join(s3BasePath, file.name).replace(/\\/g, "/");

      if (file.isDirectory()) {
        uploadFolder(filePath, s3Path);
      } else {
        uploadFile(filePath, s3Path);
      }
    });
  });
};
