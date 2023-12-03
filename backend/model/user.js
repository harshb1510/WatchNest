import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        img: String,
        img2: String,
        title: String,
        New: Boolean,
        oldPrice: Number,
        price: Number,
        cartQuantity:Number

  });

export const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    products:[ProductSchema]
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);