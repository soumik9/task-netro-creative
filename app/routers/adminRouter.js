import express from 'express'
const router = express.Router();

//** controllers import
import UpdateUser from '../controllers/user/UpdateUser.js';
import UpdateAnyUser from '../controllers/admin/UpdateAnyUser.js';

//** middlewares
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

//** others 
import { ENUM_USER_ROLE } from '../../utils/constants/constants.js';
import validateRequest from '../middleware/validateRequest.js';
import { adminValidation } from '../controllers/validations/adminValidation.js';
import { userValidation } from '../controllers/validations/userValidation.js';

//** routes
router.patch(
    '/update-user/:userId',
    auth(ENUM_USER_ROLE.ADMIN),
    upload.single('image'),
    validateRequest(adminValidation.updateAnyUserZodSchema),
    UpdateAnyUser
);

router.patch(
    '/update',
    auth(ENUM_USER_ROLE.ADMIN),
    upload.single('image'),
    validateRequest(userValidation.updateUserZodSchema),
    UpdateUser
);

export default router;