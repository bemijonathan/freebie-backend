import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyparser, { urlencoded } from 'body-parser'
import ProductRoutes from './resources/products/product.routes'
import OrderRoutes from './resources/orders/orders.route'
import { signup, signin, authenticated } from './utils/auth'
import ProductUpload from './upload'
import { multerUploads } from './config/multer.config'
import { cloudinaryConfig } from './config/clodinary.config'

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cloudinaryConfig)

// const upload = multer({ dest: './data/uploads/' })


app.post('/api/products', [authenticated, multerUploads], (req, res) => {
    ProductUpload(req, res)
})
app.post('/signup', signup)
app.post('login', signin)
// app.delete('logout',logout)
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

export default app


















// import { uploader, cloudinaryConfig } from './config/cloudinaryConfig'
// import { multerUploads, dataUri } from './middlewares/multerUpload';


