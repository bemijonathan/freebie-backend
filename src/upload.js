import { multerUploads, dataUri } from './config/multer.config';
import { uploader } from './config/clodinary.config';

export default async function ProductUpload(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    if (req.files) {
        let images = [];
        for (const i of req.files) {
            const file = dataUri(req, i).content;
            try {
                const result = await uploader.upload(file);
                console.log(result);
                images.push({img:result.url, public_id:result.public_id});
            }
            catch (error) {
                images.push("error occured");
            }
        }
        console.log(images);
        req.images = images
        next()
    } else {
        next()
    }
}
