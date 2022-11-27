import { Strategy } from 'passport-jwt';
export interface Payload {
    userId: string;
    iat: number;
    exp: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: Payload): Promise<Payload>;
}
export {};
