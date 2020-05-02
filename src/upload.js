import { multerUploads, dataUri } from './config/multer.config';
import { uploader } from './config/clodinary.config';

export async function ProductUpload(req, res) {
    console.log(req.body);
    console.log(req.files);
    if (req.files) {
        let images = [];
        for (const i of req.files) {
            const file = dataUri(req, i).content;
            try {
                const result = await uploader.upload(file);
                images.push(result.url);
            }
            catch (error) {
                images.push("error occured");
            }
        }
        console.log(images);
        res.status(201).send({ recieved: images });
    }
}