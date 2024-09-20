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
      <input type="color" list="presetColors" onInput={handleInput} value={editor.getAttributes("textStyle").color} />
      <datalist id="presetColors">
        <option>#ff0000</option>
        <option>#00ff00</option>
        <option>#0000ff</option>
      </datalist>
    </div>
  );
};
export default ColorPicker;
