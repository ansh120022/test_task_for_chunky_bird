import { describe, it, expect } from 'vitest';
import UserApi from '../../src/api/userApi.js';
import { usersArraySchema } from '../../src/schemas/userSchema.js';
import * as allure from 'allure-js-commons';
import { Status } from 'allure-js-commons';

describe('GoRest Users API Tests', () => {
    const userApi = new UserApi();

    it('TEST 1: response is not empty and structure is valid', async () => {
        await allure.step('Get users from API', async () => {
            const users = await userApi.getUsers();
            await allure.attachment('API Response', JSON.stringify(users, null, 2), 'application/json');

            if (users.length === 0) {
                await allure.logStep('Check response is not empty', Status.FAILED);
                throw new Error('API returned empty users array');
            }
            await allure.logStep('Check response is not empty', Status.PASSED);

            try {
                await allure.step('Validate schema', async () => {
                    usersArraySchema.parse(users);
                });
            } catch (schemaError) {
                await allure.attachment('Validation Errors', JSON.stringify(schemaError.errors, null, 2), 'application/json');
                throw schemaError;
            }
        });
    });

    it('TEST 2: users names starting with C present', async () => {
        await allure.step('Filter users by name starting with C', async () => {
            const users = await userApi.getUsers();
            await allure.attachment('All Users', JSON.stringify(users, null, 2), 'application/json');

            const usersWithC = users.filter(user => user.name.startsWith('C'));
            await allure.parameter('Total Users', users.length);
            await allure.parameter('Users with C', usersWithC.length);

            if (usersWithC.length > 0) {
                await allure.attachment('Matching Users', JSON.stringify(usersWithC, null, 2), 'application/json');
            }

            expect(usersWithC.length).toBeGreaterThan(0);
        });
    });

    it('TEST 3: print response in console', async () => {
        await allure.step('Get and verify users data', async () => {
            const users = await userApi.getUsers();
            await allure.attachment('Users Data', JSON.stringify(users, null, 2), 'application/json');

            expect(users.length).toBeGreaterThan(0);

            await allure.attachment('Statistics', JSON.stringify({
                totalUsers: users.length,
                activeUsers: users.filter(u => u.status === 'active').length,
                genderDistribution: users.reduce((acc, user) => {
                    acc[user.gender] = (acc[user.gender] || 0) + 1;
                    return acc;
                }, {})
            }, null, 2), 'application/json');
        });
    });

    it('BONUS TEST 1: non-existent user is handled', async () => {
        const nonExistentId = 999999999;
        await allure.parameter('Test User ID', nonExistentId);

        await allure.step('Request non-existent user', async () => {
            try {
                await userApi.getUserById(nonExistentId);
            } catch (error) {
                await allure.attachment('Error Response', JSON.stringify(error, null, 2), 'application/json');
                expect(error).toMatchObject({ status: 404 });
            }
        });
    });

    it('BONUS TEST 2: user id unique', async () => {
        await allure.step('Check for unique IDs', async () => {
            const users = await userApi.getUsers();
            await allure.attachment('Users List', JSON.stringify(users, null, 2), 'application/json');

            const idSet = new Set(users.map(user => user.id));
            await allure.parameter('Total Users', users.length);
            await allure.parameter('Unique IDs', idSet.size);

            expect(idSet.size).toBe(users.length);
        });
    });

    it('BONUS TEST 3: response size limit set', async () => {
        await allure.step('Verify response size', async () => {
            const users = await userApi.getUsers();
            await allure.attachment('Response Data', JSON.stringify(users, null, 2), 'application/json');
            await allure.parameter('Response Size', users.length);

            expect(users.length).toBeLessThanOrEqual(10);
        });
    });
});