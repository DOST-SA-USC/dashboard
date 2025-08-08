import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection } from '@tiptap/extensions';

import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { StarterKit } from '@tiptap/starter-kit';

import type { Content, JSONContent } from '@tiptap/react';

import { generateHTML } from '@tiptap/react';

export const tiptapToHTML = (content: Content): string => {
  const html = generateHTML(content as JSONContent, [
    StarterKit.configure({
      horizontalRule: false,
      link: {
        openOnClick: true,
        enableClickSelection: true,
        autolink: true,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
    }),
    HorizontalRule,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    Superscript,
    Subscript,
    Selection,
  ]);

  return html;
};
