export const jwtConstants = {
    secret: `${process.env.SECRET_KEY}`,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
};
