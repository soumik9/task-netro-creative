import ApiError from "../../utils/errors/ApiError.js";
import httpStatus from "http-status";
import verifyToken from "../../utils/helpers/jwt/verifyToken.js";
import config from "../../utils/server/config.js";
import { ENUM_USER_ROLE } from "../../utils/constants/constants.js";

export default (...requiredRoles) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');

        //** getting token
        const token = authHeader.split(' ')[1];

        //** verify token
        let verifiedUser = null;
        verifiedUser = verifyToken(
            token,
            requiredRoles.includes(ENUM_USER_ROLE.ADMIN) ? config.TOKEN_SECRET_ADMIN : config.TOKEN_SECRET
        );
        req.user = verifiedUser; //** role, userid, email

        //** role diye guard korar jnno
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }

        next();
    } catch (error) {
        next(error);
    }
}