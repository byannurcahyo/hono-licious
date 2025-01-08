export type LoginRequest = {
    username: string;
    password: string;
};

export type LogoutRequest = {
    refreshToken: string;
};

export type RefreshTokenRequest = {
    refreshToken: string;
};

export type Token = {
    token: string;
    expiresIn: number;
};

export type TokenResponse = {
    accessToken: string;
    refreshToken?: string;
};

export function toAuthResponse(
    accessToken: Token,
    refreshToken: Token
): TokenResponse {
    return {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token,
    };
}
