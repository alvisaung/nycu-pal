"use client";

import React, { ReactNode } from "react";
import { type Editor } from "@tiptap/react";
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading3, Heading4, Heading5, Underline, Quote, AlignLeft, AlignCenter, AlignRight, Image, Link } from "lucide-react";
import ColorPicker from "./ColorPicker";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  const [height, setHeight] = React.useState("480");
  const [width, setWidth] = React.useState("640");

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  };

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleClick = (type: string) => {
    let headLvl = 2;
    if (type === "heading3") {
      headLvl = 20;
    } else if (type === "heading4") {
      headLvl = 18;
    } else if (type === "heading5") {
      headLvl = 14;
    }

    switch (type) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
      case "strike":
        editor.chain().focus().toggleStrike().run();
        break;
      case "heading3":
      case "heading4":
      case "heading5":
        editor.chain().focus().setFontSize(`${headLvl}pt`).run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        break;
      case "left":
      case "center":
      case "right":
        editor.chain().focus().setTextAlign(type).run();
        break;
      case "image":
        addImage();
        break;
      case "link":
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);
        if (url === null) return;
        if (url === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        break;
      case "break":
        editor.chain().focus().setHardBreak().run();
        break;
      case "first-font":
        editor.chain().focus().setFontFamily("myFirstFont").run();
        break;
      default:
        break;
    }
  };

  const renderBtn = (type: string, icon: ReactNode) => {
    let _type: string | object = type;
    if (type === "left" || type === "center" || type === "right") {
      _type = { textAlign: type };
    }

    const getIsActive = () => {
      if (type === "heading3") {
        return editor.isActive("heading", { level: 3 });
      } else if (type === "heading4") {
        return editor.isActive("heading", { level: 4 });
      } else if (type === "heading5") {
        return editor.isActive("heading", { level: 5 });
      }
      return editor.isActive(_type);
    };

    return (
      <button
        onClick={() => handleClick(type)}
        type="button"
        className={
          getIsActive()
            ? "bg-sky-700 text-white p-0.5 rounded"
            : "hover:bg-sky-700 hover:text-white text-blue-500 p-0.5 rounded"
        }
      >
        {icon}
      </button>
    );
  };

  const commonIconStyle = "w-5 h-5";

  return (
    <div className="sticky top-0 z-10 bg-white border-b px-2 py-2 rounded-t flex justify-between items-center gap-5 w-full overflow-x-auto">
      <div className="flex items-center gap-3 flex-wrap">
        {renderBtn("first-font", "First Font")}
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
        {renderBtn("break", "Hard Break")}
        <input
          id="width"
          type="number"
          min="320"
          max="1024"
          placeholder="width"
          value={width}
          onChange={(event) => setWidth(event.target.value)}
          className="w-20 px-2 py-1 border rounded"
        />
        <input
          id="height"
          type="number"
          min="180"
          max="720"
          placeholder="height"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
          className="w-20 px-2 py-1 border rounded"
        />
        <button
          type="button"
          id="add"
          onClick={addYoutubeVideo}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add YouTube
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
