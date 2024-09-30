import React, { useState } from "react";
import UploadImgComponent from "../AdminHome/UploadImgComponent";
import FormInput from "../admin-utils/form-input";
import FormSubmit from "../admin-utils/FormSubmit";
import TopicList, { TopicType } from "../Activities/TopicListAdmin";
import FormBox from "../HOC/FormBox";
import { useFetchData } from "@/src/hooks/useFetchData";
import { ImgType } from "@/src/hooks/useImageUpload";
import Publication from ".";

const AdminPublications = () => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [img, setImages] = useState([]);
  const [publication, setPublication] = useState("");
  const [year, setYr] = useState("");
  const [url, setUrl] = useState("");
  const [paperType, setPaperType] = useState("");
  const { data: pubType } = useFetchData("publication-type");
  const { data: publications, putData } = useFetchData("publication");

  const onPublic = async (e) => {
    e.preventDefault();
    let img_url;
    if (img) {
      img_url = img[0];
    }
    const res = await putData({
      author: author,
      title: title,
      conference_name: publication,
      publish_yr: year,
      PublicationTypeId: paperType,
      img_url: img_url,
      id: id,
      url: url,
    });
    if (res) {
      onCancelEdit();
      window.alert("添加成功。");
    }
  };
  const onCancelEdit = () => {
    setTitle("");
    setAuthor("");
    setPublication("");
    setYr("");
    setUrl("");
    setPaperType("");
    setImages([]);
    setId(null);
  };
  const handleEdit = (id) => {
    let publication;
    for (const category of publications) {
      for (const yearGroup of category.publication_list) {
        publication = yearGroup.publications.find((pub) => pub.id === id);
        if (publication) {
          // Perform your edit operation here
          break; // Exit the function once we've found the publication
        }
      }
      if (publication) {
        // Perform your edit operation here
        break; // Exit the function once we've found the publication
      }
    }
    if (!publication) return;
    const { title, author, conference_name, publish_yr, PublicationTypeId, img_url, url } = publication;
    setTitle(title);
    setAuthor(author);
    setUrl(url);
    setPublication(conference_name);
    setYr(publish_yr);
    setPaperType(PublicationTypeId);
    setImages([img_url] ?? []);
    setId(id);
  };
  return (
    <div>
      <FormBox title="Add Paper">
        <div className="flex flex-row ">
          <div className="w-2/12 ">
            <UploadImgComponent initialImages={img} setImages={setImages} />
          </div>

          <form onSubmit={onPublic} className="w-10/12 ">
            <FormInput required placeholder="Paper Title" value={title} onChange={setTitle} />
            <FormInput required placeholder="Author" value={author} onChange={setAuthor} />
            <FormInput required placeholder="Publication, Conference name" value={publication} onChange={setPublication} />
            <FormInput isNumeric placeholder="Publish Year" value={year} onChange={setYr} />
            <FormInput placeholder="Url" value={url} onChange={setUrl} />
            <div className="mb-6">
              <select id="eventType" value={paperType} onChange={(e) => setPaperType(e.target.value)} className="shadow border rounded text-sm  py-2 pl-2 pr-12  pt-3    focus:shadow-outline">
                <option value="" disabled className="text-left text-sm">
                  Event type
                </option>
                {pubType.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-x-4">
              {id && (
                <button type="submit" className=" text-base   focus:shadow-outline " onClick={onCancelEdit}>
                  ❌ Cancel Edit
                </button>
              )}
              <FormSubmit title={id ? "Update" : "Publish"} />
            </div>
          </form>
        </div>
      </FormBox>

      <div className="max-w-lg">
        <TopicList topic_type={TopicType.PUBLICATION} />
      </div>
      <div className="md:w-9/12 w-full">
        {publications.map((pub, id) => (
          <div key={id}>
            <h3 className="font-medium text-2xl text-header-purple mb-4">{pub.type}</h3>
            {pub.publication_list.map((pub_yr, idj) => (
              <div id={`${pub.type}-${pub_yr.year}`} key={idj}>
                <h5 className="font-medium text-xl text-header-purple mb-2">{pub_yr.year}</h5>
                {pub_yr.publications.map((paper, idx) => (
                  <Publication {...paper} key={idx} id={paper.id} handleEdit={handleEdit} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPublications;
