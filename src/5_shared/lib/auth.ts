import { createClient } from './supabase/server';
import { UserService } from '@/4_entities/user';
import type { User } from '@prisma/client';

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
  static async getCurrentUser(): Promise<User | null> {
    const supabase = await createClient();

    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      return null;
    }

    // Get or create user in our database
    let user = await UserService.getUserByAuthId(authUser.id);

    if (!user) {
      // Create user if doesn't exist
      user = await UserService.createUser({
        authId: authUser.id,
        email: authUser.email!,
        fullName: authUser.user_metadata?.full_name,
        avatarUrl: authUser.user_metadata?.avatar_url,
        username: authUser.user_metadata?.username,
      });
    }

    return user;
  }

  static async signOut() {
    const supabase = await createClient();
    return supabase.auth.signOut();
  }

  static async requireAuth(): Promise<User> {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error('Authentication required');
    }

    return user;
  }
}
