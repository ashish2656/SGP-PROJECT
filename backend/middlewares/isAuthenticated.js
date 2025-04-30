import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "Please login first", success: false });
        }

        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (!decode) {
                return res.status(401).json({ message: "Invalid token", success: false });
            }
            req.id = decode.userId;
            next();
        } catch (jwtError) {
            return res.status(401).json({ message: "Invalid or expired token", success: false });
        }
    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export default isAuthenticated;
