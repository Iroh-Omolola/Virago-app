import { Router } from "express";
import Auth from "../controllers/auth.js";

const router = Router();

//REGISTER
router.route('/register').post(Auth.register);
//LOGIN
 router.route('/login').post(Auth.login);





export default router;
