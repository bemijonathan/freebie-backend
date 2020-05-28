import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    products: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Product'
    }
})

UserSchema.methods.comparePassword = async (password) => {
    try {
        const match = await bcrypt.compare(password, this.password);
        return match
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

UserSchema.pre('save', async function (next) {
    try {
        let hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    } catch (error) {
        throw new Error(error)
    }

})

export const User = mongoose.model('User', UserSchema)