import express from 'express';
import { login, registerUser } from '../Controllers/AuthControllers.js';
const Authroute = express.Router();
Authroute.post('/register',registerUser)
Authroute.post('/login',login)
export default Authroute;