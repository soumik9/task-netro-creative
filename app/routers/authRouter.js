import express from 'express'
const router = express.Router();

//** controllers import
import Registration from '../controllers/auth/Registration.js';
import Signin from '../controllers/auth/Signin.js';
import validateRequest from '../middleware/validateRequest.js';
import { authValidation } from '../controllers/validations/authValidation.js';

//** routes
router.post(
    '/signin',
    validateRequest(authValidation.loginZodSchema),
    Signin
);

router.post(
    '/register',
    validateRequest(authValidation.registerZodSchema),
    Registration
);

export default router;