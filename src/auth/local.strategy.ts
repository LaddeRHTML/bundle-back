import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authservice: AuthService
    ) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string)  {
        const user = await this.authservice.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        } 
        return user;
    }
}