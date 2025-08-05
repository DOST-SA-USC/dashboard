'use server';

import { db } from '../db';
import { userData } from '@/db/schema';
import { eq } from 'drizzle-orm';
import supabase from '@/lib/supabaseClient';

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

export async function uploadFile(file: File, userId: string) {
  try {
    const { data, error } = await supabase.storage
      .from('users')
      .upload(userId, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    if (data) {
      const { data: publicUrlData } = supabase.storage
        .from('users')
        .getPublicUrl(userId);
      return publicUrlData.publicUrl;
    }
    throw new Error('No Public URL returned');
  } catch (error) {
    console.error('Error uploading file to Supabase Storage:', error);
    throw error;
  }
}

export async function insertUserData(userID: string, data: FormType) {
  try {
    let imageUrl: string | null = null;
    if (typeof data.image === 'object' && userID) {
      imageUrl = await uploadFile(data.image, userID);
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
    console.error('Error inserting user data:', error);
    throw error;
  }
}
