// FormDescription.tsx

import React, { FC, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";

import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "tiptap-extension-font-size";

import UploadImgComponent from "../AdminHome/UploadImgComponent";
import Youtube from "@tiptap/extension-youtube";
import HardBreak from "@tiptap/extension-hard-break";

interface FormDescProps {
  value: string;
  onChange: (val: string, name?: string) => void;
  placeholder: string;
  required?: boolean;
  name?: string;
}

const FormDescriptionInput: FC<FormDescProps> = ({ value, onChange, placeholder, required, name }) => {
  const isRequired = Boolean(required);
  const contentRef = useRef(value);
  const [isInitialContentSet, setIsInitialContentSet] = useState(false);
  const [imgs, setImgs] = useState<string[]>([]);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      FontFamily,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading,
      Placeholder.configure({
        placeholder: `${placeholder}${isRequired ? "*" : ""}`,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      ImageResize,
      FontSize,
      Image.configure({inline: true}),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      TextStyle,
      HardBreak,
    ],
    editorProps: {
      attributes: {
        class: "shadow font-sans border border-t-0 rounded-b w-full py-2 px-3 focus:shadow-outline focus:outline-none",
      },
    },
    content: `${value} <br/> <br/> <br/>`,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), name);
    },
  });

  useEffect(() => {
    if (editor && !isInitialContentSet && value) {
      editor.commands.setContent(value);
      contentRef.current = value;
      setIsInitialContentSet(true);
    } else if (editor && isInitialContentSet && value !== editor.getHTML()) {
      editor.commands.setContent(value);
      contentRef.current = value;
    }
  }, [editor, value, isInitialContentSet]);

  return (
    <div className="mb-6 relative">
      <UploadImgComponent multiple editor initialImages={imgs} setImages={setImgs} />
      <div className="sticky top-0 z-10">
        <Toolbar editor={editor} content={value} />
      </div>
      <EditorContent editor={editor} className="focus:outline-none focus:shadow-outline mt-2" />
    </div>
  );
};

export default FormDescriptionInput;
