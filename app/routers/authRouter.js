import express from 'express'
const router = express.Router();

//** controllers import
import Registration from '../controllers/auth/Registration.js';

//routes
// router.get('/profile', auth(), profile);
// router.post('/signin', signin);
router.post('/register', Registration);

export default router;