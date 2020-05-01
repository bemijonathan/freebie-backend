import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';
import chalk from 'chalk';

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).array('image', 5)

const dUri = new Datauri();

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/

const dataUri = (req, i) => {
    return dUri.format(path.extname(i.originalname).toString(), i.buffer)
};

export { multerUploads, dataUri };
