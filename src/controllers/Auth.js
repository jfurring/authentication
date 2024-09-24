const BcryptStrategy = require('../strategies/BcryptStrategy');
const JwtStrategy = require('../strategies/JwtStrategy');

module.exports = (userRepository) => ({
    signup: async (req, res) => {
        const { password } = req.body;

        const hashedPassword = BcryptStrategy.encoded(password);
        const [user, error] = await userRepository.createUser({ ...req.body, hashedPassword });
        
        if (user) {
            return res.json({
                message: 'User created successfully',
                data: user
            });
        } else {
            let code = error.code || 400;
            return res.status(code).json({
                message: 'Sign Up failed',
                error,
            });
        }
    },

    login: async (req, res) => {
        let user;
        const { password, email, mobile } = req.body;

        if (email) {
            user = await userRepository.findUserByEmail(email);
        }
        if (mobile) {
            user = await userRepository.findUserByMobile(mobile);
        }

        const hashedPassword = BcryptStrategy.encoded(password);
        if (!user || !BcryptStrategy.compareEncoded(hashedPassword, password)) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }
        const userEmail = user.email || user.emailAddress;
        const userMobile = user.mobile || user.mobileNumber || user.mobileNo;
        const payload = { userId: user.id, email: userEmail, mobile: userMobile };
        const token = JwtStrategy.generate(payload, userRepository.jwtExpiration, userRepository.jwtSecret);

        return res.json({ token });
    }
});