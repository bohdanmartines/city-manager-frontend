const ACCESS_TOKEN_NAME = 'access_token';
const REFRESH_TOKEN_NAME = 'refresh_token';


export const getAccessToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN_NAME);
}

export const setAuthTokens = (accessToken, refreshToken) => {
    window.localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
    window.localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
}

export const clearAuthTokens = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_NAME);
    window.localStorage.removeItem(REFRESH_TOKEN_NAME);
}

export const isAuthenticated = () => {
    return getAccessToken() !== null;
}