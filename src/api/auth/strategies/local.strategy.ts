import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CreateUserDto } from 'api/users/dto/create-user.dto';
import { User } from 'api/users/schema/user.schema';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authservice: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.authservice.validateUser(
            email as unknown as Pick<User, 'email'>,
            password
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
