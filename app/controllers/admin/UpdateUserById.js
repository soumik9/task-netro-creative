import bcrypt from 'bcrypt'
import httpStatus from "http-status";
import User from "../../models/userSchema.js";
import sendResponse from "../../../utils/helpers/SendResponse.js";
import catchAsync from "../../../utils/helpers/catchAsync.js";
import config from '../../../utils/server/config.js';

const UpdateUserById = catchAsync(async (req, res) => {

    const userId = req.params.userId; //** geting user id from url params
    let body = JSON.parse(req.body.data); //** parsing body data

    //! cut out some data which should not be updated
    let { password, ...updatedData } = body;

    //** if there is file, uploading file
    if (req.file) {
        updatedData = { ...updatedData, image: req.file.path }
    }

    //** if there is password converting to hash passowrd
    if (body.password && body.password !== 'undefined') {
        const hashedPassword = await bcrypt.hash(body.password, Number(config.BYCRYPT_SALT_ROUND));
        updatedData = { ...updatedData, password: hashedPassword }
    }

    //** updating user
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, {
        $set: updatedData
    }, { new: true, runValidators: true })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User updated successfully!`,
        data: updatedUser
    });
}
)

export default UpdateUserById