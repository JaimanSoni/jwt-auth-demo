import { APIError } from "../utils/APIError.js";
import { httpStatus } from "../utils/httpStatus.js";
import { User } from "../models/user.model.js";
import { verifyAccessToken } from "../utils/tokenUtils.js";
export const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        throw new APIError(httpStatus.UNAUTHORIZED, "Authorization token missing");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyAccessToken(token);
        if (!decoded?.userId) {
            throw new APIError(httpStatus.UNAUTHORIZED, "Invalid token payload");
        }
        const user = await User.findById(decoded.userId).select("-password -refresh_token");
        if (!user) {
            throw new APIError(httpStatus.UNAUTHORIZED, "User not found");
        }
        req.user = user;
        next();
    }
    catch (err) {
        throw new APIError(httpStatus.UNAUTHORIZED, err.message || "Invalid access token");
    }
};
