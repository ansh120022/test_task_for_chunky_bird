import { describe, expect, test } from 'vitest';
import UserApi from '../../src/api/userApi.js';
import { usersArraySchema } from '../../src/schemas/userSchema.js';

describe('GoRest Users API Tests', () => {
    const userApi = new UserApi();

    test('TEST 1: response is not empty and structure is valid', async ({ task }) => {
        const users = await userApi.getUsers();
        task.data = { initialResponse: JSON.stringify(users, null, 2) };

        // First check - array not empty
        if (users.length === 0) {
            console.error('No users returned from API');
            throw new Error('API returned empty users array');
        }

        // Second check - schema validation
        try {
            usersArraySchema.parse(users);
            task.data = {
                validatedResponse: JSON.stringify(users, null, 2),
                totalUsers: users.length
            };
        } catch (schemaError) {
            console.error('Schema validation failed');
            task.data = {
                response: JSON.stringify(users, null, 2),
                validationErrors: JSON.stringify(schemaError.errors, null, 2)
            };
            throw schemaError;
        }
    });

    test('TEST 2: users names starting with C present', async ({ task }) => {
        const users = await userApi.getUsers();
        const usersWithC = users.filter(user => user.name.startsWith('C'));

        task.data = {
            totalUsers: users.length,
            usersWithC: usersWithC.length,
            matchingUsers: JSON.stringify(usersWithC, null, 2)
        };

        try {
            expect(usersWithC.length).toBeGreaterThan(0);
        } catch (error) {
            console.error('No users with names starting with C found');
            await allure.attachment(
                'Failed Response',
                JSON.stringify(users, null, 2),
                'application/json'
            );
            throw error;
        }
    });

    test('TEST 3: print response in console', async ({ task }) => {

        let users
        await allure.step("Send getUsersRequest", async () => {
            users = await userApi.getUsers();
        });


        try {
            expect(users.length).toBeGreaterThan(0);

            await allure.attachment(
                'API Response',
                JSON.stringify(users, null, 2),
                'application/json'
            );

        } catch (error) {
            await allure.attachment(
                'Failed Response',
                JSON.stringify(users, null, 2),
                'application/json'
            );
            throw error;
        }
    });

    test('BONUS TEST 1: non-existent user is handled', async ({ task }) => {
        const nonExistentId = 999999999;
        task.data = { testedId: nonExistentId };

        try {
            await expect(userApi.getUserById(nonExistentId))
                .rejects
                .toMatchObject({ status: 404 });
        } catch (error) {
            console.error('Unexpected error response');
            task.data = { errorResponse: JSON.stringify(error, null, 2) };
            throw error;
        }
    });

    test('BONUS TEST 2: user id unique', async ({ task }) => {
        const users = await userApi.getUsers();

        try {
            const idSet = new Set(users.map(user => user.id));
            task.data = {
                totalUsers: users.length,
                uniqueIds: idSet.size,
                allIds: JSON.stringify([...idSet], null, 2)
            };

            expect(idSet.size).toBe(users.length);
        } catch (error) {
            const duplicates = users.filter((user, index) =>
                users.findIndex(u => u.id === user.id) !== index
            );
            console.error('Duplicate IDs found');
            task.data = {
                duplicateEntries: JSON.stringify(duplicates, null, 2),
                allUsers: JSON.stringify(users, null, 2)
            };
            throw error;
        }
    });

    test('BONUS TEST 3: response size limit set', async ({ task }) => {
        const users = await userApi.getUsers();
        task.data = { responseSize: users.length };

        try {
            expect(users.length).toBeLessThanOrEqual(10);
        } catch (error) {
            console.error(`Response size (${users.length}) exceeds limit of 10`);
            task.data = {
                actualSize: users.length,
                response: JSON.stringify(users, null, 2)
            };
            throw error;
        }
    });
});