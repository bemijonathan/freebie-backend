import { crudControllers } from '../../utils/crud'
import { Product } from './product.model'
import { User } from '../users/users.model';

export default {
    ...crudControllers(Product),
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
    }
}
