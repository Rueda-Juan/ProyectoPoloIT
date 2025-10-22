import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')  || 'TEMP_SECRET_PARA_COMPILAR',
    });
  }

  // Este método se ejecuta si el token es válido
  async validate(payload: any) {
    // Lo que retornes aquí se adjuntará a req.user
    return { id: payload.sub, email: payload.email }; 
  }
}