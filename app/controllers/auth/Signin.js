import bcrypt from 'bcryptjs';
import User from "../../models/userSchema.js";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import ApiError from "../../../utils/errors/ApiError.js";
import generateToken from "../../../utils/helpers/jwt/generateToken.js";
import { ENUM_USER_ROLE } from '../../../utils/constants/constants.js';

const Signin = catchAsync(
    async (req, res) => {

        //! checking email and password given
        if (!req.body.email || !req.body.password) throw new ApiError(httpStatus.BAD_REQUEST, 'Fields are not there!');

        //** finding user
        const user = await User.findOne({ email: req.body.email }).lean();
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Not registered! Please try again after registration.');

        //! checking is valid password
        const isValidPassword = await bcrypt.compareSync(req.body.password, user.password);
        if (!isValidPassword) throw new ApiError(httpStatus.UNAUTHORIZED, 'Credential mismatch!');

        //** token
        const token = generateToken(user, user.role === ENUM_USER_ROLE.ADMIN ? true : false);

        //** user data
        const { password, ...pwd } = user;

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Login Success! Your role is ${user.role === ENUM_USER_ROLE.ADMIN ? 'Admin' : 'User'}`,
            data: {
                accessToken: token,
                user: pwd
            },
        });
    }
)

export default Signin