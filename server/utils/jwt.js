import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateToken = async (payload) => {
	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1 day")
		.sign(secretKey);

	return token;
};

export const verifyToken = async (token) => {
	const { payload } = await jwtVerify(token, secretKey);

	if (!payload) {
		return null;
	}

	return payload;
};
