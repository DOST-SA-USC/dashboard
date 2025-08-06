'use server';

import { db } from '../db';
import { userData } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { uploadUserImage } from '@/lib/db/storage';

import type { FormType } from '@/type';

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

export async function insertUserData(userID: string, data: FormType) {
  try {
    let imageUrl: string | null = null;
    if (typeof data.image === 'object' && userID) {
      imageUrl = await uploadUserImage(data.image, userID);
    } else {
      throw new Error(
        'Image must be a File object and userID must be provided'
      );
    }

    const result = await db.insert(userData).values({
      userId: userID,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      image: imageUrl,
      uscID: data.uscID,
      program: data.program,
      yearLevel: data.yearLevel,
      contactNumber: data.contactNumber,
      address: data.address,
      birthDate: data.birthDate,
      yearOfAward: data.yearOfAward,
      scholarshipType: data.scholarshipType,
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as typeof userData.$inferInsert);

    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      const errorMsg = error.message || '';
      if (errorMsg.includes('Failed query: insert into "user_data"')) {
        throw new Error('User already exists with this USC ID.');
      }

      throw new Error('An unknown error occurred, please try again later.');
    } else {
      throw new Error('An unknown error occurred, please try again later.');
    }
  }
}
