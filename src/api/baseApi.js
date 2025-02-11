import { config } from '../../config/config.js';

class BaseApi {
    constructor() {
        this.baseURL = config.apiBaseUrl;
    }

    async handleError(response) {
        const errorResponse = {
            status: response.status,
            message: response.statusText,
            data: await response.json().catch(() => null)
        };
        console.error('API Error:', errorResponse);
        throw errorResponse;
    }

    async get(url) {
        const response = await fetch(`${this.baseURL}${url}`);

        if (!response.ok) {
            await this.handleError(response);
        }

        return response.json();
    }
}

export default BaseApi;