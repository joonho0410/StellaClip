import { createClient } from './supabase/server';
// import type { User } from '@prisma/client'; // Temporarily disabled - no User model

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    username?: string;
  };
}

export class AuthService {
  static async getCurrentUser(): Promise<null> {
    // Temporarily disabled - no User model
    return null;
  }

  static async signOut() {
    const supabase = await createClient();
    return supabase.auth.signOut();
  }

  static async requireAuth(): Promise<never> {
    throw new Error('Authentication not implemented - no User model');
  }
}
