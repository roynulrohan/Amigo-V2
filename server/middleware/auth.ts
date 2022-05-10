import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

interface Params {
    token: string;
}

export const verifyToken = ({ token }: Params) => {
    try {
        const isCustomAuth = token.length < 500;
        let contentDecoded: string | JwtPayload;
        let userId: string;

        if (token && isCustomAuth) {
            contentDecoded = jwt.verify(token, jwtSecret);
            userId = (contentDecoded as any).id;
        } else {
            contentDecoded = jwt.decode(token);
        }

        if (!userId) {
            return { error: 'Invalid Token' };
        }

        return { userId };
    } catch (error) {
        return { error: 'Invalid Token' };
    }
};
