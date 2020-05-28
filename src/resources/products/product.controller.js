import { crudControllers } from '../../utils/crud'
import { Product } from './product.model'
import { User } from '../users/users.model';
import { uploader } from '../../config/clodinary.config';

export default {
    ...crudControllers(Product),
    home: async (req, res) => {
        const favorites = await Product.find().limit(4).exec()
        res.status(200).send(favorites)
    },
    createOne: async (req, res) => {
        console.log(req.body)
        let doc;
        try {
            doc = await Product.create({
                ...req.body, createdBy: req.user.id
            })
            User.findByIdAndUpdate({ id: req.user.id }, { $push: { products: doc.id } })

        } catch (error) {
            return res.status(422).json({ error })
        }
        res.status(201).json({ data: doc })
    },
    async deleteImage(req, res) {
        try {
            const Item = await Product.findById(req.params.id)

            console.log("prosuct", Item)

            uploader.destroy(Item.images[req.params.image_id].public_id, function (response) {
                console.log(response)
                const images = Item.images.filter((image, i) => i !== +req.params.image_id)
                Item.images = images
                Item.save().then((doc) => {
                    console.log(doc)
                    res.status(202).send({ error: Item })
                })
            })

        } catch (error) {
            // console.error(error)
            res.status(400).end()
        }

    }
}
