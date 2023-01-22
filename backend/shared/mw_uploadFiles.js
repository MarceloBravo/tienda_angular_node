//const util = require("util");
import path from "path";
import multer from "multer";   //npm install --save multer
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = {
  storage:
    multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(`${__dirname}/../public${storage.folderPath}`));
    },
    filename: (req, file, callback) => {
      console.log('FILE = ',file);
      const match = ["image/png", "image/jpeg","image/ico"];

      if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} no es válido. sólo se aceptan archivos png/jpeg e ico.`;
        return callback(message, null);
      }

      //var filename = `${Date.now()}-bezkoder-${file.originalname}`;
      var filename = file.originalname;
      callback(null, filename);
    }
  }),
  folderPath: ''
};
//export const uploadFiles = multer({ storage: storage, limits : {fileSize : 1000000} });
//var mwUploadFiles = util.promisify(uploadFiles);
//module.exports = uploadFiles;