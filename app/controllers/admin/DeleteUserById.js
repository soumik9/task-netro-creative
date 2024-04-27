import httpStatus from "http-status";
import User from "../../models/userSchema.js";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";

const DeleteUserById = catchAsync(
    async (req, res) => {

        const userId = req.params.userId; //* getting user id from url 

        //? checking is user available
        const user = await User.findOne({ _id: userId });
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Check is user available!');

        //* deleting data
        await User.deleteOne({ _id: userId })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User deleted successfully!',
        });
    }
)

export default DeleteUserById