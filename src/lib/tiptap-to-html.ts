import { Highlight } from '@tiptap/extension-highlight';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Image } from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection } from '@tiptap/extensions';
import { generateHTML } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import type { JSONContent } from '@tiptap/react';

function ensureAbsoluteUrl(text: string): string {
  // Skip empty
  if (!text) return text;

  // Already has protocol (http, https, mailto, etc.)
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(text)) {
    return text;
  }

  // Looks like a domain or starts with "www."
  if (text.startsWith('www.') || /^[\w.-]+\.[a-z]{2,}/i.test(text)) {
    return `https://${text}`;
  }

  return text;
}

export function normalizeLinks(node: JSONContent): JSONContent {
  if (!node) return node;

  if (node.type === 'text' && node.marks) {
    node.marks = node.marks.map((mark) => {
      if (mark.type === 'link') {
        if (!mark.attrs) {
          mark.attrs = {};
        }
        if (!mark.attrs.href && node.text) {
          mark.attrs.href = ensureAbsoluteUrl(node.text.trim());
        }
      }
      return mark;
    });
  }

  if (node.content) {
    node.content = node.content.map(normalizeLinks);
  }

  return node;
}

export const tiptapToHTML = (content: JSONContent): string => {
  const normalized = normalizeLinks(content);

  const html = generateHTML(normalized, [
    StarterKit.configure({
      horizontalRule: false,
    }),
    Link.configure({
      openOnClick: true,
      autolink: true,
      linkOnPaste: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
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
