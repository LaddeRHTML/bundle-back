"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: `${process.env.SECRET_KEY}`,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
};
//# sourceMappingURL=jwt-const.js.map