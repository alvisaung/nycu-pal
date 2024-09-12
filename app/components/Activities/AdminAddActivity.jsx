"use client";
import FormInput from "@/app/components/admin-utils/form-input";
import FormDescriptionInput from "@/app/components/admin-utils/FormDescrption";
import FormSubmit from "@/app/components/admin-utils/FormSubmit";
import UploadImgComponent from "@/app/components/AdminHome/UploadImgComponent";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useEffect, useState } from "react";
import moment from "moment";

const AdminAddActivity = ({ imgs_arr = [], title_edit = "", description_edit = "", selected_edit = "", id = "" }) => {
  const [imgs, setImgs] = useState(imgs_arr);
  const [showYoutubeEmbed, setShowYoutubeEmbed] = useState(false); // Toggle state
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [title, setTitle] = useState(title_edit);
  const [description, setDescription] = useState(description_edit);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(selected_edit);
  const { data: event, putData } = useFetchData(`events?id=${id}`);
  const { data: eventType } = useFetchData("events-type");

  useEffect(() => {
    if (id && event) {
      setSelectedEvent(event?.EventsType?.id);
      setTitle(event.title);
      setDescription(event.desc);

      const imgs = event.img_url ? event.img_url : [];
      setShowYoutubeEmbed(Boolean(event.youtube_embed_url));
      setYoutubeEmbedUrl(event.youtube_embed_url);
      setImgs(imgs);
      const event_date = event.event_date && moment(event.event_date).format("YYYY-MM-DD");
      setSelectedDate(event_date);
    }
  }, [id, event]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!selectedEvent || !title || !description) {
      setErrorMessage("All fields are required.");
      return;
    }
    const event_date = selectedDate && new Date(selectedDate).toISOString().replace(/T/, " ").replace(/\..+/g, "");
    const res = await putData({ event_type_id: selectedEvent, title, desc: description, img_url: imgs, id: event?.id, youtube_embed_url: youtubeEmbedUrl, event_date: event_date });
    if (res) {
      window.alert("添加成功！");
      setSelectedEvent("");
      setTitle("");
      setDescription("");
      setSelectedDate(null);
      setImgs([]);
    }
    // Handle form submission
  };
  const handleToggle = () => {
    if (showYoutubeEmbed) {
      setYoutubeEmbedUrl("");
    } else {
      // Clear Image data when switching to Youtube embed
      setImgs([]);
    }
    setShowYoutubeEmbed(!showYoutubeEmbed);
  };

  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-xl font-semibold mb-2">Add Event</h2>

      <div className="flex items-center space-x-4 mb-4">
        <span className="text-sm font-medium text-gray-700">Youtube Embed</span>
        <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${showYoutubeEmbed ? "bg-blue-500" : "bg-gray-300"}`} onClick={handleToggle}>
          <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${showYoutubeEmbed ? "translate-x-6" : "translate-x-0"}`}></div>
        </div>
      </div>
      {showYoutubeEmbed ? <FormInput multi label="Youtube Embed" placeholder="Embed Youtube URL..." value={youtubeEmbedUrl} onChange={(e) => setYoutubeEmbedUrl(e)} /> : <UploadImgComponent multiple initialImages={imgs} setImages={(res) => setImgs(res)} />}
      <div className="w-full mt-8 font-medium ">
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
        <input type="date" className="form-control  mb-4 border border-gray-300  rounded-md px-4 py-2" id="inputDate4" placeholder="dd-mm-yyyy" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} max={moment().format("YYYY-MM-DD")} />
        <FormInput placeholder="Event Title" value={title} onChange={(e) => setTitle(e)} />

        <FormDescriptionInput label="Description" placeholder="Event Detail..." value={description} onChange={(e) => setDescription(e)} />

        {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

        <FormSubmit onClick={handleSubmit} title={id ? "Update" : `Publish`} />
      </div>
    </div>
  );
};
export default AdminAddActivity;
