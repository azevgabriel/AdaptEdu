export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface GoogleUserProfile {
  googleId: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

