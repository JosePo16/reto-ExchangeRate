import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interfaces/user.interface';
import { PayloadToken } from '../interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const users: User[] = [
      {
        username: 'jose.ponte',
        password: '12345678',
        role: 'admin',
        id: 1,
      },
    ];

    const user: User = users.find(
      (x) => x.username === username && x.password === password,
    );

    if (user) return user;

    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
