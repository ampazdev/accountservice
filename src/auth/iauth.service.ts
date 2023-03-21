import { LoginDto, UserForRegistration } from "./dto";

export interface IAuthService {
    createUser(dto: UserForRegistration) : any;
    verifyUser(dto: LoginDto) : any;
    signToken(userId: string, email: string): Promise<string>;
}