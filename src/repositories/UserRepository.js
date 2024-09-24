class UserRepository {
    async findUserByEmail(email) {
        throw new Error("findUserByEmail() must be implemented");
    }

    async createUser(userData) {
        throw new Error("createUser() must be implemented");
    }
}

export default UserRepository;