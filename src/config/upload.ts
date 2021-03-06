import path from 'path';
import { uuid } from 'uuidv4';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileName = `${uuid()}.${file.originalname.split('.').pop()}`;

      return callback(null, fileName);
    },
  }),
};
