import express from "express";
import { Adduser, buyerInfoFill, ShowProduct, giveFeedback, fetchProduct,searchProduct, Logout, sellerInfoFill } from "../controller/User.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/AddUser", Adduser);//as soon auth hua call it
router.post("/buyer",protectRoute,buyerInfoFill)
router.post("/seller",protectRoute,sellerInfoFill)
router.get("/fetchProduct",protectRoute,fetchProduct)
router.get("/logout",protectRoute,Logout)
router.get("/serach?name",protectRoute,searchProduct);
router.post("/Updatefeedback/:Pid",giveFeedback)
router.get("/:Pid",protectRoute,ShowProduct);

export default router