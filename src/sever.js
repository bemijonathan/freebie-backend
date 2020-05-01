import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyparser, { urlencoded } from 'body-parser'
import multer from 'multer'
import ProductRoutes from './resources/products/product.routes'
import OrderRoutes from './resources/orders/orders.route'
import { signup, signin } from './utils/auth'
import { multerUploads, dataUri } from './config/multer.config'
import { cloudinaryConfig, uploader } from './config/clodinary.config'

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cloudinaryConfig)

// const upload = multer({ dest: './data/uploads/' })


app.post('/api/products', multerUploads, async function (req, res, next) {
    console.log(req.body)
    console.log(req.files)
    if (req.files) {
        let images = []
        for (const i of req.files ){
            const file = dataUri(req, i).content;
            try {
                const result = await uploader.upload(file)
                images.push(result.url)
            } catch (error) {
                images.push("error occured")
            }
        }
        console.log(images)
        res.status(201).send({ recieved: images })
    }
})

app.post('/signup', signup)
app.post('login', signin)
// app.delete('logout',logout)
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

export default app


















// import { uploader, cloudinaryConfig } from './config/cloudinaryConfig'
// import { multerUploads, dataUri } from './middlewares/multerUpload';


