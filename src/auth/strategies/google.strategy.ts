import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const clientID = configService.get<string>('_GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('_GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('_GOOGLE_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google OAuth configuration is missing');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;
      
      if (!emails?.length) {
        throw new Error('No email provided from Google');
      }

      const userData = {
        email: emails[0].value,
        name: `${name?.givenName || ''} ${name?.familyName || ''}`.trim(),
        avatar: photos?.[0]?.value || '',
        googleId: profile.id,
        provider: 'google' as const,
      };

      const userFromDb = await this.authService.validateOrCreateGoogleUser(userData);
      done(null, userFromDb);
    } catch (error) {
      done(error as Error, undefined);
    }
  }
} 