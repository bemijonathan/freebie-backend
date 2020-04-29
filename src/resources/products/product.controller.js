import { crudControllers } from '../../utils/crud'
import { Product } from './product.model'

export default {
    ...crudControllers(Product),
    createOne: async (req, res) => {
        console.log(req.form)
        let doc;
        try {
            doc = await Product.create({
                ...req.body
            })
        } catch (error) {
            return res.status(422).json({error})
        }
        res.status(201).json({ data: doc })
    }
}
