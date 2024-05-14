import express from "express";
const router = express.Router();
import { updateUser,deleteUser,getUserListings } from "../controllers/user.controller.js";
import  {verifyToken}  from "../utils/verifyUser.js";

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings)

export default router;
