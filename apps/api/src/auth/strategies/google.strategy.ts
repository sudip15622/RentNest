import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleoOauthConfig from '../configs/googleo-oauth.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleoOauthConfig.KEY)
    private readonly googleConfig: ConfigType<typeof googleoOauthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientID!,
      clientSecret: googleConfig.clientSecret!,
      callbackURL: googleConfig.callbackURL!,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const user = await this.authService.validateGoogleUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        image: profile.photos[0].value,
    });

    // Extract state from request query parameters
    const state = req.query?.state || req.body?.state || req.params?.state;

    // Attach the state parameter for later use
    const userWithState = {
      ...user,
      oauthState: state
    };

    done (null, userWithState);
  }
}
