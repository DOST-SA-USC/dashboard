import { db } from '../db';
import { userData } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getUserDataById(userId: string) {
  try {
    const result = await db
      .select()
      .from(userData)
      .where(eq(userData.userId, userId))
      .limit(1);

    return result[0];
  } catch (error) {
    console.error('Error fetching user data by ID:', error);
    throw error;
  }
}
