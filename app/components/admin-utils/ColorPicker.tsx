import { Editor } from "@tiptap/react";
import { ChangeEvent } from "react";

type Props = {
  editor: Editor;
};
const ColorPicker = ({ editor }: Props) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(event.target.value).run();
  };

  return (
    <div className="flexRow center stretchSelf">
      <input type="color" onInput={handleInput} value={editor.getAttributes("textStyle").color} />
    </div>
  );
};
export default ColorPicker;
