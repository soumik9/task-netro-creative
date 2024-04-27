import express from 'express'
const router = express.Router();

//** controllers import
import UpdateUser from '../controllers/user/UpdateUser.js';
import UpdateUserById from '../controllers/admin/UpdateUserById.js';

//** middlewares
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

//** others 
import { ENUM_USER_ROLE } from '../../utils/constants/constants.js';
import validateRequest from '../middleware/validateRequest.js';
import { adminValidation } from '../controllers/validations/adminValidation.js';
import { userValidation } from '../controllers/validations/userValidation.js';
import DeleteUserById from '../controllers/admin/DeleteUserById.js';
import GetUsers from '../controllers/admin/GetUsers.js';

//** routes
router.get(
    '/users',
    auth(ENUM_USER_ROLE.ADMIN),
    GetUsers
);

router.patch(
    '/update-user/:userId',
    auth(ENUM_USER_ROLE.ADMIN),
    upload.single('image'),
    validateRequest(adminValidation.updateAnyUserZodSchema),
    UpdateUserById
);

router.patch(
    '/update',
    auth(ENUM_USER_ROLE.ADMIN),
    upload.single('image'),
    validateRequest(userValidation.updateUserZodSchema),
    UpdateUser
);

router.delete(
    '/delete/:userId',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(adminValidation.deleteUserZodSchema),
    DeleteUserById
);

export default router;