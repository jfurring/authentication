const bcrypt = require('bcrypt');

let envSaltRound = process.env.SALT_ROUND;

class BcryptStrategy {
    static encoded(data, saltRound) {
        const encoded = btoa(data);
        const round = Number(saltRound ?? envSaltRound ?? 10);
        return bcrypt.hashSync(encoded, round);
    }
    
    static simple(data, saltRound) {
        const round = Number(saltRound ?? envSaltRound ?? 10);
        return bcrypt.hashSync(data, round);
    }
    
    static compareEncoded(hashed, plain) {
        const encoded = btoa(plain);
        return bcrypt.compareSync(encoded, hashed);
    }
    
    static compare(hashed, plain) {
        return bcrypt.compareSync(plain, hashed);
    }
}

module.exports = BcryptStrategy;