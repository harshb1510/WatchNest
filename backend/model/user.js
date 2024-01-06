import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  img: String,
  img2: String,
  title: String,
  New: Boolean,
  oldPrice: Number,
  price: Number,
});

const CartItemSchema = new mongoose.Schema({
  product: {
    type: ProductSchema,
    required: true,
  },
  cartQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  cart: {
    cartItems: {
      type: [CartItemSchema],
      default: [],
    },
    cartTotalQuantity: {
      type: Number,
      default: 0,
    },
    cartTotalAmount: {
      type: Number,
      default: 0,
    },
  },
});

export default mongoose.model('User', UserSchema);
