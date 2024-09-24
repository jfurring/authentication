let userRepository;

const setUserRepository = (customRepository) => {
    userRepository = customRepository;
}

let { signup, login } = require('./src/controllers/Auth')(userRepository);
import authenticate from './src/middlewares/authenticate';

function initAuthModule(customRepository, app) {
    setUserRepository(customRepository);

    app.post('/auth/signup', signup);
    app.post('/auth/login', login);
    // app.post('/forgot-password', login);
    // app.post('/change-password', authenticate, login);
}

module.exports = initAuthModule;