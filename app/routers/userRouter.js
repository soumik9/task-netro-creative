import express from 'express'
const router = express.Router();

//** controllers import
import UpdateUser from '../controllers/user/UpdateUser.js';

//** middlewares
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

//** others
import { ENUM_USER_ROLE } from '../../utils/constants/constants.js';
import validateRequest from '../middleware/validateRequest.js';
import { userValidation } from '../controllers/validations/userValidation.js';

//** routes
router.patch(
    '/update',
    auth(ENUM_USER_ROLE.USER),
    upload.single('image'),
    validateRequest(userValidation.updateUserZodSchema),
    UpdateUser
);

export default router;