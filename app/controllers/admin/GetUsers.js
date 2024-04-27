import httpStatus from "http-status";
import User from "../../models/userSchema.js";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";

const GetUsers = catchAsync(
    async (req, res) => {

        //* get users
        const result = await User.find();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Users are retrieved successfully!',
            data: result,
        });
    }
)

export default GetUsers