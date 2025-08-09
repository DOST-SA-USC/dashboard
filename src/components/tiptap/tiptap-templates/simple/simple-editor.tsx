'use client';

import '@/components/tiptap/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss';
import '@/components/tiptap/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap/tiptap-node/image-node/image-node.scss';
import '@/components/tiptap/tiptap-node/heading-node/heading-node.scss';
import '@/components/tiptap/tiptap-node/paragraph-node/paragraph-node.scss';
// --- Styles ---
import '@/components/tiptap/tiptap-templates/simple/simple-editor.scss';

import * as React from 'react';

// --- Icons ---
import { ArrowLeftIcon } from '@/components/tiptap/tiptap-icons/arrow-left-icon';
import { HighlighterIcon } from '@/components/tiptap/tiptap-icons/highlighter-icon';
import { LinkIcon } from '@/components/tiptap/tiptap-icons/link-icon';
import { HorizontalRule } from '@/components/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';
// --- Tiptap Node ---
import { ImageUploadNode } from '@/components/tiptap/tiptap-node/image-upload-node/image-upload-node-extension';
// --- Components ---
// --- UI Primitives ---
import { Button } from '@/components/tiptap/tiptap-ui-primitive/button';
import { Spacer } from '@/components/tiptap/tiptap-ui-primitive/spacer';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/tiptap/tiptap-ui-primitive/toolbar';
import { BlockquoteButton } from '@/components/tiptap/tiptap-ui/blockquote-button';
// --- Tiptap UI ---
import { HeadingDropdownMenu } from '@/components/tiptap/tiptap-ui/heading-dropdown-menu';
import { ImageUploadButton } from '@/components/tiptap/tiptap-ui/image-upload-button';
import { ListDropdownMenu } from '@/components/tiptap/tiptap-ui/list-dropdown-menu';
import { MarkButton } from '@/components/tiptap/tiptap-ui/mark-button';
import { UndoRedoButton } from '@/components/tiptap/tiptap-ui/undo-redo-button';
// --- Hooks ---
import { useIsMobile } from '@/hooks/use-mobile';
// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection } from '@tiptap/extensions';
import {
  Content,
  EditorContent,
  EditorContext,
  useEditor,
} from '@tiptap/react';
// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit';

const MainToolbarContent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={['bulletList', 'orderedList', 'taskList']}
          portal={isMobile}
        />
        <BlockquoteButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: 'highlighter' | 'link';
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>
  </>
);

export function SimpleEditor(props: {
  content: Content | null;
  updateContent: (content: Content | null) => void;
}) {
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = React.useState<
    'main' | 'highlighter' | 'link'
  >('main');
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor',
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
          autolink: true,
          linkOnPaste: false,
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
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
    ],
    content: props.content,
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      props.updateContent(jsonContent);
    },
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main');
    }
  }, [isMobile, mobileView]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
        className="absolute bottom-0"
        style={{
          ...(isMobile
            ? {
                bottom: '0',
              }
            : {}),
        }}
      >
        {mobileView === 'main' ? (
          <MainToolbarContent isMobile={isMobile} />
        ) : (
          <MobileToolbarContent
            type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
            onBack={() => setMobileView('main')}
          />
        )}
      </Toolbar>

      <EditorContent
        editor={editor}
        role="presentation"
        className="simple-editor-content"
      />
    </EditorContext.Provider>
  );
}
