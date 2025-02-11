import BaseApi from './baseApi.js';
import User from '../models/user.js';
import { usersArraySchema } from '../schemas/userSchema.js';

class UserApi extends BaseApi {
    async getUsers() {
        const data = await this.get('/users');
        const validatedData = usersArraySchema.parse(data);
        return validatedData.map(userData => new User(userData));
    }

    async getUserById(id) {
        const data = await this.get(`/users/${id}`);
        return new User(data);
    }
}

export default UserApi;