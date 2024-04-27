import User from "../../models/userSchema.js";
import httpStatus from "http-status";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import ApiError from "../../../utils/errors/ApiError.js";
import { ENUM_USER_ROLE } from "../../../utils/constants/constants.js";
import { sendMessageToQueue } from "../../../utils/server/messageQueue.js";

const Registration = catchAsync(
    async (req, res) => {

        //** finding user if exists
        const user = await User.findOne({ email: req.body.email });
        if (user) throw new ApiError(httpStatus.BAD_REQUEST, 'Account already exists!');

        //** creating user
        const data = await User.create(req.body);

        //** Send message to queue for further processing
        // sendMessageToQueue({ userId: data._id, email: data.email });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `${req.body.role === ENUM_USER_ROLE.ADMIN ? 'Admin' : 'User'} created successfully!`,
            data
        });
    }
)

export default Registration