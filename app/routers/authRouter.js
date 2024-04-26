import express from 'express'
const router = express.Router();

//** controllers import
import Registration from '../controllers/auth/Registration.js';
import Signin from '../controllers/auth/Signin.js';

//** routes
router.post('/signin', Signin);
router.post('/register', Registration);

export default router;