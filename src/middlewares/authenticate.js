import JwtStrategy from "../strategies/JwtStrategy";

function authenticate(req, res, next) {
    let token = req.headers.authorization || req.headers.Authorization;
    if (token.includes(' ')) {
        token = token.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: "Authorization token is missing" });

    try {
        const user = JwtStrategy.verify(token);
        if (user.data) {
            req.user = user.data;
            next();
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default authenticate;