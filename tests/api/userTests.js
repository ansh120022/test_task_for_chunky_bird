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
            task.fail('No users returned from API');
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
            task.fail('Schema validation failed');
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
            task.fail('No users with names starting with C found');
            task.data = { allUsers: JSON.stringify(users, null, 2) };
            throw error;
        }
    });

    test('TEST 3: print response in console', async ({ task }) => {
        const users = await userApi.getUsers();

        try {
            expect(users.length).toBeGreaterThan(0);

            const stats = {
                totalUsers: users.length,
                activeUsers: users.filter(u => u.status === 'active').length,
                genderDistribution: users.reduce((acc, user) => {
                    acc[user.gender] = (acc[user.gender] || 0) + 1;
                    return acc;
                }, {})
            };

            task.data = {
                statistics: JSON.stringify(stats, null, 2),
                fullResponse: JSON.stringify(users, null, 2)
            };
        } catch (error) {
            task.fail('Empty response received');
            task.data = { response: JSON.stringify(users, null, 2) };
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
            task.fail('Unexpected error response');
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
            task.fail('Duplicate IDs found');
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
            task.fail(`Response size (${users.length}) exceeds limit of 10`);
            task.data = {
                actualSize: users.length,
                response: JSON.stringify(users, null, 2)
            };
            throw error;
        }
    });
});