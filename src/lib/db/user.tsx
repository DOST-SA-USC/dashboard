'use server';

import { createClient } from '@/lib/supabase/server';

async function getUserByUUID(userUUID: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('id', userUUID)
    .single();

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  return data;
}

export { getUserByUUID };
