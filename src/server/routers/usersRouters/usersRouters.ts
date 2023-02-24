import { Router } from "express";
import {
  createUser,
  loginUser,
} from "../../controllers/usersControllers/usersControllers.js";
import multer from "multer";
import uniqid from "uniqid";

const usersRouter = Router();
const storage = multer.diskStorage({
  destination(req, file, callBack) {
    callBack(null, "uploads/");
  },
  filename(req, file, callBack) {
    callBack(null, uniqid(`${file.fieldname}-`, `-${file.originalname}`));
  },
});

const upload = multer({ storage });

usersRouter.post("/register", upload.single("avatar"), createUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
