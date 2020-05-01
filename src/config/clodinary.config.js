import { config, uploader } from 'cloudinary';


const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: 'mixedcode',
        api_key: '252624857599431',
        api_secret: '2RJ3TC1WS3a4GItCs4cJaBTwJsA',
    })
    next()
};


export { cloudinaryConfig, uploader };