import express from 'express'
const router = express.Router();

//** controllers import
import UpdateUser from '../controllers/user/UpdateUser.js';
import { ENUM_USER_ROLE } from '../../utils/constants/constants.js';

//** middlewares
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

//** routes
router.patch('/update', auth(ENUM_USER_ROLE.ADMIN), upload.single('image'), UpdateUser);

export default router;