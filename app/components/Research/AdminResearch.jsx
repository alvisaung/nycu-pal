import React, { useEffect, useState } from "react";
import UploadImgComponent from "../AdminHome/UploadImgComponent";
import FormInput from "../admin-utils/form-input";
import FormSubmit from "../admin-utils/FormSubmit";
import { GoTrash } from "react-icons/go";
import FormBox from "../HOC/FormBox";
import FormDescriptionInput from "../admin-utils/FormDescrption";
import { researchBranch, researchTopicType } from "@/app/[lang]/research/page";
import { ImgType } from "@/src/hooks/useImageUpload";
import { useFetchData } from "@/src/hooks/useFetchData";

// interface FormData {
//   id: number;
//   img: string | null;
//   title: string;
//   detail: string;
// }

const AdminResearch = () => {
  const [statementImg, setStatementMedia] = useState("");
  const [statement, setStatement] = useState("");
  const [topics, setTopics] = useState([]);
  const { data: research_statement, putData } = useFetchData("research");
  const { data: research_topic, putData: putResearchTopic, delData } = useFetchData("research-topic");
  const [showYoutubeEmbed, setShowYoutubeEmbed] = useState(false); // Toggle state
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");

  useEffect(() => {
    if (research_statement.length > 0) {
      const research = research_statement[0];
      setStatement(research.statement);
      setStatementMedia(research.media_url);
    }
  }, [research_statement]);

  useEffect(() => {
    if (research_topic.length > 0) {
      let _new_topic = research_topic.map((t, id) => ({ ...t, tempId: id }));
      setTopics(_new_topic);
    }
  }, [research_topic]);

  const onPublicTopic = async (e, tempId) => {
    e.preventDefault();
    const topic_edit = topics.filter((t) => t.tempId == tempId);
    const update = await putResearchTopic(topic_edit[0]);
    if (update) {
      window.alert("Update Topic Success.");
    }
  };

  const onPublicStatement = async (e) => {
    e.preventDefault();
    if (!statement) {
      window.alert("Need Statement");
      return;
    }
    const id = research_statement.length > 0 ? research_statement[0].id : null;
    const res = await putData({ statement: statement, media_url: statementImg ?? "", id: id });
    if (res) {
      window.alert("Add Statement Success.");
    }
  };
  const addTopic = () => {
    setTopics([...topics, { media_url: [], title: "", description: "", tempId: new Date().getTime() }]);
  };

  const addBranch = (topicId) => {
    const newBranch = { tempId: Date.now(), title: "", description: "", media_url: [] };
    setTopics((prevTopics) => prevTopics.map((topic) => (topic.tempId === topicId ? { ...topic, ResearchBranches: [...(topic.ResearchBranches || []), newBranch] } : topic)));
    return;
  };
  const deleteForm = async (topicTempId, branchId, topicID) => {
    const _topics = JSON.parse(JSON.stringify(topics));
    // const targetTopicIndex = _topics.findIndex((topic) => topic.tempId == topicTempId);
    // if (targetTopicIndex === -1) return; // Exit if topic not found

    if (branchId) {
      // Delete a specific branch from a topic
      _topics[targetTopicIndex].ResearchBranches = _topics[targetTopicIndex].ResearchBranches?.filter((branch) => branch.tempId !== branchId) || [];
    } else if (topicTempId) {
      // Delete an entire topic
      _topics.splice(targetTopicIndex, 1);
    } else if (topicID) {
      await delData({ id: topicID });
    }
    setTopics(_topics);
  };

  const updateBranchForm = (value, name, branchId, topicId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic.tempId === topicId) {
          return {
            ...topic,
            ResearchBranches: topic.ResearchBranches?.map((branch) => (branch.tempId == branchId ? { ...branch, [name]: value } : branch)) || [],
          };
        }
        return topic;
      })
    );
  };

  const onUpdateTopicForm = (val, name, id) => {
    console.log(topics);
    setTopics((prevTopics) => prevTopics.map((t) => (t.tempId === id ? { ...t, [name]: val } : t)));
  };
  // const myUpdater = ;
  //
  const handleToggle = () => {
    if (showYoutubeEmbed) {
      // Clear Youtube Embed data when switching to image upload
      setYoutubeEmbedUrl("");
    } else {
      // Clear Image data when switching to Youtube embed
      // setImgs([]);
    }
    setShowYoutubeEmbed(!showYoutubeEmbed);
  };
  return (
    <div>
      <FormBox title="Edit Research Statement">
        <div className="mb-4">
          <UploadImgComponent initialImages={[statementImg]} setImages={(img) => setStatementMedia(img[0])} />
        </div>

        <form onSubmit={onPublicStatement} className="">
          <FormDescriptionInput required name="statement" placeholder="Research Statement" value={statement} onChange={(val) => setStatement(val)} />
          <FormSubmit title="Publish" />
        </form>
      </FormBox>

      {topics.map((topic, id) => (
        <FormBox title={topic.title} key={id}>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-medium text-gray-700">Youtube Embed</span>
            <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${showYoutubeEmbed ? "bg-blue-500" : "bg-gray-300"}`} onClick={handleToggle}>
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${showYoutubeEmbed ? "translate-x-6" : "translate-x-0"}`}></div>
            </div>
          </div>
          {showYoutubeEmbed ? <FormInput multi label="Youtube Embed" placeholder="Embed Youtube URL..." value={youtubeEmbedUrl} onChange={(e) => setYoutubeEmbedUrl(e)} /> : <UploadImgComponent multiple initialImages={topic.media_url} setImages={(res) => onUpdateTopicForm(res, "media_url", topic.tempId)} />}

          <button onClick={() => deleteForm(topic.id ? null : topic.tempId, null, topic.id)} className="absolute top-2 right-2  bg-red-500 text-white rounded-full p-1 ">
            <GoTrash />
          </button>

          <form onSubmit={(e) => onPublicTopic(e, topic.tempId)} className="mt-4">
            <FormInput required placeholder="Title" name="title" value={topic.title} id={topic.tempId} onChange={onUpdateTopicForm} />
            <FormDescriptionInput required placeholder="Research Topic" value={topic.description} onChange={(val, name) => onUpdateTopicForm(val, "description", topic.tempId)} />
            <button className="underline mb-8 font-medium" onClick={() => addBranch(topic.tempId)}>
              Add Branch
            </button>
            {topic.ResearchBranches &&
              topic.ResearchBranches.map((branch) => (
                <FormBox title={branch.title} key={branch.tempId}>
                  <button onClick={() => deleteForm(topic.tempId, branch.tempId)} className="absolute top-2 right-2  bg-red-500 text-white rounded-full p-1 ">
                    <GoTrash />
                  </button>
                  <UploadImgComponent multiple initialImages={branch.media_url} setImages={(res) => updateBranchForm(res, "media_url", branch.tempId, topic.tempId)} />
                  <div className="mt-4">
                    <FormInput required placeholder="Title" name="title" id={branch.tempId} value={branch.title} onChange={(val, name, id) => updateBranchForm(val, name, id, topic.tempId)} />
                    <FormDescriptionInput required placeholder="Detail" value={branch.description} onChange={(val, name) => updateBranchForm(val, "description", branch.tempId, topic.tempId)} />
                  </div>
                </FormBox>
              ))}
            <FormSubmit title="Publish" />
          </form>
        </FormBox>
      ))}
      <button onClick={addTopic} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded text-base">
        Add Research Topic
      </button>
    </div>
  );
};

export default AdminResearch;
