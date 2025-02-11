import { describe, it, expect } from 'vitest';
import { userSchema } from './userSchema.js';

describe('User Schema Validation', () => {
    it('should reject invalid user data', () => {
        const invalidUser = {
            id: "invalid",
            email: null,
            gender: "invalid",
            status: false
        };

        expect(() => userSchema.parse(invalidUser)).toThrow();
    });
});