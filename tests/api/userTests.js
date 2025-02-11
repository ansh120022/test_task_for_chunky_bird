import { describe, it, expect } from 'vitest';
import UserApi from '../../src/api/userApi.js';
import { usersArraySchema } from '../../src/schemas/userSchema.js';

describe('GoRest Users API Tests', () => {
    const userApi = new UserApi();

    it('TEST 1: response is not empty and structure is valid', async () => {
        const users = await userApi.getUsers();

        // First check - array not empty
        if (users.length === 0) {
            console.error('Test failed: No users returned from API');
            console.error('API Response:', JSON.stringify(users, null, 2));
            throw new Error('API returned empty users array');
        }

        // Second check - schema validation
        try {
            usersArraySchema.parse(users);
        } catch (schemaError) {
            console.error('Test failed: Schema validation failed');
            console.error('API Response:', JSON.stringify(users, null, 2));
            console.error('Validation errors:', schemaError.errors);
            throw schemaError;
        }
    });

    it('TEST 2: users names starting with C present', async () => {
        const users = await userApi.getUsers();

        try {
            const usersWithC = users.filter(user => user.name.startsWith('C'));
            expect(usersWithC.length).toBeGreaterThan(0);
        } catch (error) {
            console.error('Test failed. No users with a name starting with "C". All users:',
                JSON.stringify(users, null, 2));
            throw error;
        }
    });

    it('TEST 3: print response in console', async () => {
        const users = await userApi.getUsers();

        try {
            expect(users.length).toBeGreaterThan(0);
            console.log('Users found:', JSON.stringify(users, null, 2));
        } catch (error) {
            console.error('Test failed. API Response:', JSON.stringify(users, null, 2));
            throw error;
        }
    });

    it('BONUS TEST 1: non-existent user is handled', async () => {
        try {
            await expect(userApi.getUserById(999999999))
                .rejects
                .toMatchObject({ status: 404 });
        } catch (error) {
            console.error('Test failed. Error response:', JSON.stringify(error, null, 2));
            throw error;
        }
    });

    it('BONUS TEST 2: user id unique', async () => {
        const users = await userApi.getUsers();
        try {
            const idSet = new Set(users.map(user => user.id));
            expect(idSet.size).toBe(users.length);
        } catch (error) {
            console.error('Test failed. Duplicate IDs found. Users:',
                JSON.stringify(users, null, 2));
            throw error;
        }
    });

    it('BONUS TEST 3: response size limit set', async () => {
        const users = await userApi.getUsers();
        try {
            expect(users.length).toBeLessThanOrEqual(10);
        } catch (error) {
            console.error('Test failed. Unexpected number of users:', users.length);
            console.error('Users:', JSON.stringify(users, null, 2));
            throw error;
        }
    });
});