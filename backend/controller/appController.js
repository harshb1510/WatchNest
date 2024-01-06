import UserModel from '../model/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ProductModel from "../model/product.js"



export async function register(req, res) {
    try {
        const { firstName,lastName,email,password } = req.body;
        // Check the existing username

        // Check for an existing email
        const existEmail = await UserModel.findOne({ email });
         if (existEmail) {
            res.status(400).send({ error: "Please use a unique email" });
        } else {
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);

                const user = new UserModel({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                });

                // Save the user and handle the result
                try {
                    const result = await user.save();
                    res.status(201).send({ msg: "User registered successfully" });
                    
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ error });
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}

export async function login(req, res) {
    try {
        
        const { email, password } = req.body;
        // Check for an existing email
        UserModel.findOne({ email })
    .then(user => {
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        bcrypt.compare(password, user.password)
            .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            email: user.email
                        }, process.env.JWTPRIVATEKEY, { expiresIn: "24h" });
        
                        return res.status(200).send({
                            msg: "Login Successful...!",
                            token
                        });
                        
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}


export async function getUser(req, res) {
    try {
        const { _id } = req.params;
        const user = await UserModel.findOne({ _id }); // Await here
        if (!user) {
            throw new Error("No User found");
        } else {
            return res.status(201).json(user);
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}

export async function updateCart(req,res){
    try {
        const { id } = req.params;
        const product = req.body;
        const productId = product._id;
        const user = await UserModel.findOne({ _id: id });
    
        if (!user) {
            throw new Error("No User found");
        } else {
            const cartItems = user.cart.cartItems;
            const existingProductIndex = cartItems.findIndex((item) => item.product._id.toString() === productId.toString());
    
            if (existingProductIndex !== -1) {
                // Product already exists in the cart
                cartItems[existingProductIndex].cartQuantity += 1;
            } else {
                // Product doesn't exist in the cart, add it
                cartItems.push({ product: product, cartQuantity: 1 });
            }
    
            const cartTotalQuantity = user.cart.cartTotalQuantity + 1;
            const cartTotalAmount = user.cart.cartTotalAmount + product.price;
    
            await UserModel.updateOne({ _id: id }, {
                $set: {
                    "cart.cartItems": cartItems,
                    "cart.cartTotalQuantity": cartTotalQuantity,
                    "cart.cartTotalAmount": cartTotalAmount,
                },
            });
        }
    
        res.status(200).send({ message: "Done" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function clearCart(req,res){
    try {
        const { _id } = req.params;
        const user = await UserModel.findOne({ _id });
    
        if (!user) {
            throw new Error("No User found");
        } else {
            await UserModel.updateOne({ _id }, {
                $set: {
                    "cart.cartItems": [],
                    "cart.cartTotalQuantity": 0,
                    "cart.cartTotalAmount": 0,
                },
            });
        }
    
        res.status(200).send({ message: "Done" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function decreaseQuantity(req, res) {
    try {
        const { _id, cartId } = req.params;
        const user = await UserModel.findOne({ _id });

        if (!user) {
            throw new Error("No User found");
        } else {
            const cartItems = user.cart.cartItems;
            const existingProductIndex = cartItems.findIndex((item) => item._id.toString() === cartId.toString());

            if (existingProductIndex !== -1) {
                if (cartItems[existingProductIndex].cartQuantity > 1) {
                    const cartTotalQuantity = user.cart.cartTotalQuantity - 1;
                    const cartTotalAmount = user.cart.cartTotalAmount - cartItems[existingProductIndex].product.price;

                    cartItems[existingProductIndex].cartQuantity -= 1;

                    await UserModel.updateOne({ _id }, {
                        $set: {
                            "cart.cartItems": cartItems,
                            "cart.cartTotalQuantity": cartTotalQuantity,
                            "cart.cartTotalAmount": cartTotalAmount,
                        },
                    });
                } else {
                    // If cart quantity is 1, remove the item from the cart
                    cartItems.splice(existingProductIndex, 1);

                    await UserModel.updateOne({ _id }, {
                        $set: {
                            "cart.cartItems": cartItems,
                            "cart.cartTotalQuantity": user.cart.cartTotalQuantity - 1,
                            "cart.cartTotalAmount": user.cart.cartTotalAmount - cartItems[existingProductIndex].product.price,
                        },
                    });
                }
            }
        }

        res.status(200).send({ message: "Done" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function getCartTotal(req,res){
    try {
        const { _id } = req.params;
        const user = await UserModel.findOne({ _id });
    
        if (!user) {
            throw new Error("No User found");
        } else {
            return res.status(201).json(user.cart.cartTotalAmount);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}


export async function removeItemCart(req,res){
    try {
        const { _id, cartId } = req.params;
        const user = await UserModel.findOne({ _id });
    
        if (!user) {
            throw new Error("No User found");
        } else {
            const cartItems = user.cart.cartItems;
            const existingProductIndex = cartItems.findIndex((item) => item._id.toString() === cartId.toString());
    
            if (existingProductIndex !== -1) {
                const cartTotalQuantity = user.cart.cartTotalQuantity - cartItems[existingProductIndex].cartQuantity;
                const cartTotalAmount = user.cart.cartTotalAmount - (cartItems[existingProductIndex].product.price * cartItems[existingProductIndex].cartQuantity);
    
                cartItems.splice(existingProductIndex, 1);
    
                await UserModel.updateOne({ _id }, {
                    $set: {
                        "cart.cartItems": cartItems,
                        "cart.cartTotalQuantity": cartTotalQuantity,
                        "cart.cartTotalAmount": cartTotalAmount,
                    },
                });
            }
        }
    
        res.status(200).send({ message: "Done" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}



export async function getCart(req,res){
    try{
        const id  = req.params._id;
        const user = await UserModel.findOne({_id:id});
        if(!user){
            throw new Error("No User found");
        }else{
            return res.status(201).json(user.cart);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).send({error:error.message || "Internal Server Error"});
    }
}

export async function product(req,res){
    try{
        const products = await ProductModel.find();
        res.send(products);
    }catch(error){
        console.error(error);
        res.status(500).send({error:error.message || "Internal Server Error"});
    }
}