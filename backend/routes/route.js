import {Router} from "express";
const router = Router();
import * as controller from '../controller/appController.js';

//post requests
router.route("/register").post(controller.register);//register user
router.route("/login").post(controller.login);//login user
router.route("/user/:_id/productsStore").post(controller.productsStore);

//get request
router.route("/user/:_id").get(controller.getUser);
router.route("/products").get(controller.product);


export default router;

