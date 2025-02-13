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
        console.log('\nStarting Test 1: Validating API response structure');
        const users = await userApi.getUsers();
        console.log(`Retrieved ${users.length} users from API`);

        // First check - array not empty
        if (users.length === 0) {
            console.error('FAIL: No users returned from API');
            console.error('Response:', JSON.stringify(users, null, 2));
            throw new Error('API returned empty users array');
        }
        console.log('PASS: Array is not empty');

        // Second check - schema validation
        try {
            usersArraySchema.parse(users);
            console.log('PASS: Schema validation successful');
            console.log('Sample user structure:', JSON.stringify(users[0], null, 2));
        } catch (schemaError) {
            console.error('FAIL: Schema validation failed');
            console.error('Response:', JSON.stringify(users, null, 2));
            console.error('Validation errors:', schemaError.errors);
            throw schemaError;
        }
    });

    it('TEST 2: users names starting with C present', async () => {
        console.log('\nStarting Test 2: Checking users with names starting with C');
        const users = await userApi.getUsers();
        console.log(`Total users retrieved: ${users.length}`);

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
            console.log(`Found ${usersWithC.length} users with names starting with C`);
            expect(usersWithC.length).toBeGreaterThan(0);
            console.log('PASS: Users found:', usersWithC.map(user => user.name).join(', '));
        } catch (error) {
            console.error('FAIL: No users with name starting with "C"');
            console.error('Response:', JSON.stringify(users, null, 2));
            throw error;
        }
    });

    it('TEST 3: print response in console', async () => {
        console.log('\nStarting Test 3: Logging API response');
        const users = await userApi.getUsers();

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
            console.log('Response Analysis:');
            console.log(`- Total users: ${users.length}`);
            console.log(`- Active users: ${users.filter(u => u.status === 'active').length}`);
            console.log(`- Gender distribution:`, users.reduce((acc, user) => {
                acc[user.gender] = (acc[user.gender] || 0) + 1;
                return acc;
            }, {}));
            console.log('Full response:', JSON.stringify(users, null, 2));
        } catch (error) {
            console.error('FAIL: Empty response');
            console.error('Response:', JSON.stringify(users, null, 2));
            throw error;
        }
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
        console.log(`\nStarting Bonus Test 1: Testing non-existent user ID: ${nonExistentId}`);

        try {
            const response = await userApi.getUserById(nonExistentId).catch(e => e);
            expect(response).toMatchObject({ status: 404 });
            console.log('PASS: Received expected 404 error');
        } catch (error) {
            console.error('FAIL: Unexpected response');
            console.error('Response:', JSON.stringify(error, null, 2));
            throw error;
        }
    });

    it('BONUS TEST 2: user id unique', async () => {
        console.log('\nStarting Bonus Test 2: Checking for unique IDs');
        const users = await userApi.getUsers();

        try {
            const idSet = new Set(users.map(user => user.id));
            console.log(`Checking IDs - Total: ${users.length}, Unique: ${idSet.size}`);
            expect(idSet.size).toBe(users.length);
            console.log('PASS: All IDs are unique');
        } catch (error) {
            console.error('FAIL: Found duplicate IDs');
            console.error('Response:', JSON.stringify(users, null, 2));
            const duplicates = users.filter((user, index) =>
                users.findIndex(u => u.id === user.id) !== index
            );
            console.error('Duplicate entries:', JSON.stringify(duplicates, null, 2));
            throw error;
        }
    });

    it('BONUS TEST 3: response size limit set', async () => {
        console.log('\nStarting Bonus Test 3: Checking response size limit');
        const users = await userApi.getUsers();

        try {
            console.log(`Response size: ${users.length} users`);
            expect(users.length).toBeLessThanOrEqual(10);
            console.log('PASS: Response size within limits');
        } catch (error) {
            console.error(`FAIL: Response size (${users.length}) exceeds limit of 10`);
            console.error('Response:', JSON.stringify(users, null, 2));
            throw error;
        }
    });
});