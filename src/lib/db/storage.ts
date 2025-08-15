import supabase from '@/lib/supabaseClient';
import type { Content } from '@tiptap/react';

export async function uploadUserImage(file: File, userId: string) {
  try {
    const { data, error } = await supabase.storage
      .from('users')
      .upload(userId, file, {
        cacheControl: '120', // 2 mins
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

export async function uploadAnnouncementImages(
  file: File,
  announcementId: string
) {
  try {
    const { data, error } = await supabase.storage
      .from('announcements')
      .upload(`${announcementId}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    if (data) {
      const { data: publicUrlData } = supabase.storage
        .from('announcements')
        .getPublicUrl(`${announcementId}/${file.name}`);
      return publicUrlData.publicUrl;
    }
    throw new Error('No Public URL returned');
  } catch (error) {
    console.error('Error uploading file to Supabase Storage:', error);
    throw error;
  }
}

export const replaceBlobUrls = async (
  announcementId: string,
  content: Content
): Promise<Content> => {
  let imageIndex = 0;

  const walk = async (node: Record<string, unknown>): Promise<Content> => {
    if (
      node.type === 'image' &&
      typeof node.attrs === 'object' &&
      node.attrs &&
      'src' in node.attrs &&
      typeof (node.attrs as Record<string, unknown>).src === 'string' &&
      ((node.attrs as Record<string, string>).src as string).startsWith('blob:')
    ) {
      try {
        const src = (node.attrs as Record<string, string>).src;
        const blob = await fetch(src).then((res) => res.blob());
        const extension = blob.type.split('/')[1] || 'png';
        const file = new File([blob], `${imageIndex++}.${extension}`, {
          type: blob.type,
        });
        const uploadedUrl = await uploadAnnouncementImages(
          file,
          announcementId
        );
        return {
          ...node,
          attrs: {
            ...(node.attrs as object),
            src: uploadedUrl,
          },
        } as Content;
      } catch (error) {
        console.error('Failed to replace blob URL:', error);
        return node as Content;
      }
    }

    if (Array.isArray(node.content)) {
      const updatedChildren = await Promise.all(
        node.content.map((child) => walk(child as Record<string, unknown>))
      );
      return { ...node, content: updatedChildren } as Content;
    }

    return node as Content;
  };

  return await walk(content as unknown as Record<string, unknown>);
};
