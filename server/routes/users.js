import express from "express";
import { getAllUsers, newUser, getUserByID, uploadImage, deleteUser, updateUser, deleteImage, login, getMyProfile, verifyAndUpdatePW } from "../controllers/usersController.js";
import { multerUploads } from '../middlewares/multer.js';
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

// router.get("/all", getAllUsers);
router.get("/user/:id", getUserByID);

router.get("/my-profile", jwtAuth, getMyProfile);
router.post("/verify-password", jwtAuth, verifyAndUpdatePW);

router.post('/upload-image', jwtAuth, multerUploads.single("image"), uploadImage);
router.post('/delete-image', jwtAuth, deleteImage);
router.post('/sign-up', newUser);
router.post('/login', login);

router.patch('/update-user', jwtAuth, updateUser);

router.delete('/user/:id', jwtAuth, deleteUser);

export default router