'use server';

import { db } from '../db';
import { userData, user } from '@/db/schema';
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
      emergencyContact: data.emergencyContact,
      emergencyContactNumber: data.emergencyContactNumber,
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

export async function getAllUserEmails() {
  try {
    const result = await db.select({ email: user.email }).from(user);
    return result.map((u) => u.email);
  } catch (error) {
    console.error('Error fetching all user emails:', error);
    throw error;
  }
}

export async function doesUserEmailExist(email: string): Promise<boolean> {
  try {
    const result = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return result.length > 0;
  } catch (error) {
    console.error('Error checking if user email exists:', error);
    throw error;
  }
}

export async function getUserIdByEmail(email: string) {
  try {
    const result = await db
      .select({ userId: user.id })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return result.length > 0 ? result[0].userId : null;
  } catch (error) {
    console.error('Error fetching user ID by email:', error);
    throw error;
  }
}

export async function getUserDataByUscID(uscID: string) {
  try {
    const result = await db
      .select({
        uscID: userData.uscID,
        firstName: userData.firstName,
        lastName: userData.lastName,
        middleName: userData.middleName,
        image: userData.image,
        program: userData.program,
        scholarshipType: userData.scholarshipType,
        yearOfAward: userData.yearOfAward,
        yearLevel: userData.yearLevel,
      })
      .from(userData)
      .where(eq(userData.uscID, uscID))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error('Error fetching user data by USC ID:', error);
    throw error;
  }
}
