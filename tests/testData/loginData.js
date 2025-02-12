export const TEST_USERS = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        description: 'standard user login',
        expectedUrl: '/inventory.html',
        shouldPass: true
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        description: 'locked out user login',
        expectedError: 'Epic sadface: Sorry, this user has been locked out.',
        shouldPass: false
    },
    {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        description: 'performance glitch user login',
        expectedUrl: '/inventory.html',
        shouldPass: true,
        minResponseTime: 500
    }
];

export const INVALID_CREDENTIALS = [
    {
        username: '',
        password: '',
        expectedError: 'Epic sadface: Username is required'
    },
    {
        username: 'standard_user',
        password: '',
        expectedError: 'Epic sadface: Password is required'
    },
    {
        username: 'invalid_user',
        password: 'invalid_password',
        expectedError: 'Epic sadface: Username and password do not match any user in this service'
    }
];