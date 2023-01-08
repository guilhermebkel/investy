const AuthConfig = {
	tokenKey: "x-notion-integration-auth-token",
	tokenExpirationInSeconds: 60 * 60 * 24 * (1), // 24 hours
	tokenSecret: process.env.AUTH_TOKEN_SECRET,
	hashSaltRounds: 12,
}

export default AuthConfig
