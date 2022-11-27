import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const RefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshStrategy extends RefreshStrategy_base {
    private authService;
    constructor(authService: AuthService);
}
export {};
