import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";

import Link from "@tiptap/extension-link";
import {
  BoldIcon,
  Check,
  CodeIcon,
  ItalicIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Strikethrough,
  UnderlineIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import sanitize from "sanitize-html";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ExtensionType =
  | "bold"
  | "italic"
  | "strike"
  | "underline"
  | "code"
  | "orderedList"
  | "bulletList"
  | "link";

type TextEditorProps = {
  value: string | undefined;
  extensions?: ExtensionType[];
  onContentChange: (content: string) => void;
};

const TextEditor = ({
  value,
  extensions = [
    "bold",
    "italic",
    "strike",
    "underline",
    "code",
    "orderedList",
    "bulletList",
  ],
  onContentChange,
}: TextEditorProps) => {
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [url, setUrl] = useState("");

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      ...(extensions.includes("bold") ? [Bold] : []),
      ...(extensions.includes("italic") ? [Italic] : []),
      ...(extensions.includes("strike") ? [Strike] : []),
      ...(extensions.includes("underline") ? [Underline] : []),
      // ...(extensions.includes("link") ? [Link] : []),
      ...(extensions.includes("code")
        ? [
            Code.configure({
              HTMLAttributes: {
                class: "bg-gray-200/75 py-px px-1.5 rounded-md",
              },
            }),
          ]
        : []),
      ...(extensions.includes("bulletList")
        ? [
            BulletList.configure({
              HTMLAttributes: { class: "list-disc pl-4" },
            }),
          ]
        : []),
      ...(extensions.includes("orderedList")
        ? [
            OrderedList.configure({
              HTMLAttributes: { class: "list-decimal pl-4" },
            }),
          ]
        : []),
      ListItem,
    ],
    onUpdate({ editor }) {
      const rawHtml = editor.getHTML();
      const sanitizedHtml = sanitize(rawHtml, {
        allowedTags: ["strong", "em", "u", "s", "ul", "ol", "li", "code", "p"],
        allowedAttributes: { "*": ["class", "style"] },
      });
      onContentChange(sanitizedHtml);
    },
    editorProps: {
      attributes: {
        class:
          "h-36 overflow-y-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-[1.5px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      },
    },
    content: value || "",
  });

  // const handleLink = useCallback(() => {
  //   // const previousUrl = editor?.getAttributes("link").href;
  //   // setUrl(previousUrl);
  //   if (url === "") {
  //     editor?.chain().focus().extendMarkRange("link").unsetLink().run();
  //     return;
  //   }

  //   editor
  //     ?.chain()
  //     .focus()
  //     .extendMarkRange("link")
  //     .setLink({ href: url })
  //     .run();

  //   setDialogOpen(false);
  // }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="space-x-3">
        {extensions.includes("bold") && (
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            pressed={editor.isActive("bold")}
            aria-label="Toggle Bold"
          >
            <BoldIcon className="size-4" />
          </Toggle>
        )}

        {extensions.includes("italic") && (
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            pressed={editor.isActive("italic")}
            aria-label="Toggle italic"
          >
            <ItalicIcon className="size-4" />
          </Toggle>
        )}

        {extensions.includes("strike") && (
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            pressed={editor.isActive("strike")}
            aria-label="Toggle strike"
          >
            <Strikethrough className="size-4" />
          </Toggle>
        )}

        {extensions.includes("code") && (
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            pressed={editor.isActive("code")}
            aria-label="Toggle Code"
          >
            <CodeIcon className="size-4" />
          </Toggle>
        )}

        {extensions.includes("underline") && (
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            pressed={editor.isActive("underline")}
            aria-label="Toggle underline"
          >
            <UnderlineIcon className="size-4" />
          </Toggle>
        )}

        {extensions.includes("bulletList") && (
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            pressed={editor.isActive("bulletList")}
            aria-label="Toggle bulletList"
          >
            <List className="size-4" />
          </Toggle>
        )}

        {extensions.includes("orderedList") && (
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            pressed={editor.isActive("orderedList")}
            aria-label="Toggle orderedList"
          >
            <ListOrdered className="size-4" />
          </Toggle>
        )}

        {/* {extensions.includes("link") && (
          <Dialog open={dialogOpen} onOpenChange={(val) => setDialogOpen(val)}>
            <Toggle
              variant="outline"
              onClick={() => setDialogOpen(true)}
              pressed={editor.isActive("link")}
              aria-label="Toggle link"
            >
              <LinkIcon />
            </Toggle>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLink()}
                  />
                </div>
              </div>

              <DialogFooter className="!justify-start">
                <Button type="submit" onClick={handleLink}>
                  <Check />
                  <span>Done</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )} */}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
