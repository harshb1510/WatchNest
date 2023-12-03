import UserModel from '../model/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {products} from "../products.js"



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
                const hashedPassword = await bcrypt.hash(password, process.env.SALT);

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

export async function productsStore(req, res) {
    try {
      const cartItems = req.body;
      const { id } = req.params;
      const user = await UserModel.findOne({ id });
  
      // Find the existing product in the user's cart
      const existingProductIndex = user.products.findIndex(
        (p) => p.title === cartItems.cartItems[0].title
      );
  
      if (existingProductIndex >= 0) {
        
        user.products[existingProductIndex].cartQuantity +=
          cartItems.cartItems[0].cartQuantity;
        user.save();
        res.status(200).send({ msg: "Product quantity updated in cart" });
      } else {
        
        const product = {
          title: cartItems.cartItems[0].title,
          price: cartItems.cartItems[0].price,
          img: cartItems.cartItems[0].img,
          img2: cartItems.cartItems[0].img2,
          cartQuantity: cartItems.cartItems[0].cartQuantity,
        };
  
        user.products.push(product);
        user.save();
        res.status(201).send({ msg: "Product added to cart" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message || "Internal Server Error" });
    }
  }
  

export async function product(req,res){
    res.send({products});
}