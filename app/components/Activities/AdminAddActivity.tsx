"use client";
import FormInput from "@/app/components/admin-utils/form-input";
import FormDescriptionInput from "@/app/components/admin-utils/FormDescrption";
import FormSubmit from "@/app/components/admin-utils/FormSubmit";
import UploadImgComponent from "@/app/components/AdminHome/UploadImgComponent";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useEffect, useState } from "react";

interface AdminAddActivityProps {
  imgs_arr: string[];
  title_edit: string;
  description_edit: "";
  selected_edit: "";
  id: string;
}

const AdminAddActivity = ({ imgs_arr = [], title_edit = "", description_edit = "", selected_edit = "", id = "" }: AdminAddActivityProps) => {
  const [imgs, setImgs] = useState<string[]>(imgs_arr);
  const [title, setTitle] = useState(title_edit);
  const [description, setDescription] = useState(description_edit);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(selected_edit);
  const { data: event, putData } = useFetchData(`events?id=${id}`);
  const { data: eventType } = useFetchData("events-type");
  useEffect(() => {
    if (id && event) {
      setSelectedEvent(event.EventsType?.id);
      setTitle(event.title);
      setDescription(event.desc);
      setImgs(event.img_url);
    }
  }, [id, event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage("");
    if (!selectedEvent || !title || !description) {
      setErrorMessage("All fields are required.");
      return;
    }

    const res = await putData(JSON.stringify({ event_type_id: selectedEvent, title, desc: description, img_url: imgs, id: event?.id }));
    if (res) {
      window.alert("添加成功！");
      // setSelectedEvent('');
      // setTitle("");
      // setDescription('');
    }
    // Handle form submission
  };
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-xl font-semibold mb-2">Add Event</h2>
      <UploadImgComponent multiple initialImages={imgs} setImages={(res) => setImgs(res)} />
      <form onSubmit={handleSubmit} className="w-full mt-8 font-medium ">
        <div className="mb-6">
          <select id="eventType" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} className="shadow border rounded text-sm  py-2 pl-2 pr-12  pt-3    focus:shadow-outline">
            <option value="" disabled className="text-left text-sm">
              Event type
            </option>
            {eventType.map((event) => (
              <option value={event.id} key={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        <FormInput placeholder="Event Title" value={title} onChange={(e) => setTitle(e)} />

        <FormDescriptionInput label="Description" placeholder="Event Detail..." value={description} onChange={(e) => setDescription(e)} />

        {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

        <FormSubmit title={id ? "Update" : `Publish`} />
      </form>
    </div>
  );
};
export default AdminAddActivity;
