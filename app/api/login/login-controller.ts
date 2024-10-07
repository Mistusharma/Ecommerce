import jwt from 'jsonwebtoken';


export const generateAuthToken = async (email: string): Promise<string> => {
    if (!process.env.SECRET_TOKEN) {
        throw new Error('Missing SECRET_TOKEN environment variable');
    }
    // Generate and return a JWT token for the user
    const token = jwt.sign(
        { email },
        process.env.SECRET_TOKEN,
        { expiresIn:process.env.EXPIREIN  } // Token expires in 36 hours
    );

    return token;
};