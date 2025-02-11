import { userSchema } from '../schemas/userSchema.js';

class User {
    constructor(data) {
        const validatedData = userSchema.parse(data);
        Object.assign(this, validatedData);
    }

    isActive() {
        return this.status === 'active';
    }

    getFullName() {
        return this.name;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            gender: this.gender,
            status: this.status
        };
    }
}

export default User;