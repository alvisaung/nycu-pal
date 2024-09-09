"use client";

import React, { ReactNode, useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2, Underline, Quote, Undo, Redo, Code, Icon, AlignLeft, AlignCenter, AlignRight, Heading3, Heading4, Heading5, Image, Link } from "lucide-react";
import ColorPicker from "./ColorPicker";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor && editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  const handleClick = (type: string) => {
    let headLvl: Level = 2;
    if (type == "heading3") {
      headLvl = 3;
    } else if (type == "heading4") {
      headLvl = 4;
    } else if (type == "heading5") {
      headLvl = 5;
    }
    if (type == "bold") {
      editor.chain().focus().toggleBold().run();
    } else if (type == "italic") {
      editor.chain().focus().toggleItalic().run();
    } else if (type == "underline") {
      editor.chain().focus().toggleUnderline().run();
    } else if (type == "strike") {
      editor.chain().focus().toggleStrike().run();
    } else if (type == "heading3" || type == "heading4" || type == "heading5") {
      editor.chain().focus().toggleHeading({ level: headLvl }).run();
    } else if (type == "bulletList") {
      editor.chain().focus().toggleBulletList().run();
    } else if (type == "orderedList") {
      editor.chain().focus().toggleOrderedList().run();
    } else if (type == "blockquote") {
      editor.chain().focus().toggleBlockquote().run();
    } else if (type == "left" || type == "center" || type == "right") {
      editor.chain().focus().setTextAlign(type).run();
    } else if (type == "image") {
      addImage();
    } else if (type == "link") {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);
      if (url === null) {
        return;
      }
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const renderBtn = (type: string, icon: ReactNode) => {
    let _type: string | object = type;
    if (type == "left" || type == "center" || type == "right") {
      _type = { textAlign: type };
    }
    const getIsActive = () => {
      if (type == "heading3") {
        return editor.isActive("heading", { level: 3 });
      } else if (type == "heading4") {
        return editor.isActive("heading", { level: 4 });
      } else if (type == "heading5") {
        return editor.isActive("heading", { level: 5 });
      }
      return editor.isActive(_type);
    };

    return (
      <button onClick={() => handleClick(type)} className={getIsActive() ? "bg-sky-700 text-white p-0.5 rounded" : " hover:bg-sky-700 hover text-blue-500 hover:text-white p-0.5 hover:rounded"}>
        {icon}
      </button>
    );
  };

  const commonIconStyle = "w-5 h-5  ";
  return (
    <div
      className="border px-2 py-2 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap "
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        {renderBtn("bold", <Bold className={commonIconStyle} />)}
        {renderBtn("italic", <Italic className={commonIconStyle} />)}
        {renderBtn("underline", <Underline className={commonIconStyle} />)}
        {renderBtn("strike", <Strikethrough className={commonIconStyle} />)}
        {renderBtn("heading3", <Heading3 className={commonIconStyle} />)}
        {renderBtn("heading4", <Heading4 className={commonIconStyle} />)}
        {renderBtn("heading5", <Heading5 className={commonIconStyle} />)}
        {renderBtn("bulletList", <List className={commonIconStyle} />)}
        {renderBtn("orderedList", <ListOrdered className={commonIconStyle} />)}
        {renderBtn("blockquote", <Quote className={commonIconStyle} />)}
        {renderBtn("left", <AlignLeft className={commonIconStyle} />)}
        {renderBtn("center", <AlignCenter className={commonIconStyle} />)}
        {renderBtn("right", <AlignRight className={commonIconStyle} />)}
        {renderBtn("image", <Image className={commonIconStyle} />)}
        {renderBtn("link", <Link className={commonIconStyle} />)}
        <ColorPicker editor={editor} />
      </div>
    </div>
  );
};

export default Toolbar;
