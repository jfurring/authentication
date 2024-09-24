const jwt = require('jsonwebtoken');

const envJwtSecret = process.env.JWT_SECRET;
const envJwtExpiration = process.env.JWT_EXPIRATION;

class JwtStrategy {
    static generate(data, jwtExpiration, jwtSecret) {
        return jwt.sign(
            data,
            jwtSecret || envJwtSecret,
            { expiresIn: jwtExpiration || envJwtExpiration }
        );
    }

    static verify(token, jwtSecret) {
        try {
            const jwtData = jwt.verify(token, jwtSecret || envJwtSecret);
            return {
                data: jwtData,
            };
        } catch (e) {
            return {
                error: e || { message: 'Unable to verify jwt' }
            }
        }
    }

    static decode(token, jwtSecret) {
        try {
            const jwtData = jwt.decode(token, jwtSecret || envJwtSecret);
            return {
                data: jwtData,
            };
        } catch (e) {
            return {
                error: e || { message: 'Unable to decode jwt' }
            };
        }
    }
}

module.exports = JwtStrategy;