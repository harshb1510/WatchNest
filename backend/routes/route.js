import {Router} from "express";
const router = Router();
import * as controller from '../controller/appController.js';

//post requests
router.route("/register").post(controller.register);//register user
router.route("/login").post(controller.login);//login user
router.route("/user/:id/cart").post(controller.updateCart)

//delete request
router.route("/user/:_id/cart/:cartId").delete(controller.removeItemCart);
router.route("/user/:_id/cart").delete(controller.clearCart);

//patch request
router.route("/user/:_id/cart/:cartId").patch(controller.decreaseQuantity);

//get request
router.route("/user/:_id").get(controller.getUser);
router.route("/user/:_id/cartData").get(controller.getCart);
router.route("/products").get(controller.product);
router.route("/user/:_id/cartTotal").get(controller.getCartTotal);


export default router;

