import { Product } from "../resources/products/product.model"

// export const migrate = async (req, res) => {
//     try {

//         // const a  = await Product.find()
//         // console.log(a)
//         // Product.updateMany({}, {images: [{
//         //     $set
//         // }]})

//         let doc = await Product.find()

//         let copy =  JSON.parse(JSON.stringify(doc))



//         for (let e of copy) {
//             for (let i = 0; i < e.images.length; i++) {
//                 e.images = { img: e.images[i], url: "hello" }
//             }
//         }

//         const doc = await Product.updateMany({}, {})

//         // await doc.save()
        
//         res.status(202).send(
//             { success: doc }
//         )
//     } catch (error) {
//         console.error(error)
//         res.status(400).send({error})
//     }
// }
