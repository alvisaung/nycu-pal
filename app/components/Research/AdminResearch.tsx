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

interface FormData {
  id: number;
  img: string | null;
  title: string;
  detail: string;
}

const AdminResearch = () => {
  const [statementImg, setStatementMedia] = useState<string>();
  const [statement, setStatement] = useState("");
  const [topics, setTopics] = useState<researchTopicType[]>([]);
  const { data: research_statement, putData } = useFetchData("research");
  const { data: research_topic, putData: putResearchTopic } = useFetchData("research-topic");

  useEffect(() => {
    if (research_statement.length > 0) {
      const research = research_statement[0];
      setStatement(research.statement);
      setStatementMedia([research.media_url]);
    }
  }, [research_statement]);

  useEffect(() => {
    if (research_topic.length > 0) {
      let _new_topic = research_topic.map((t: researchTopicType, id) => ({ ...t, tempId: id }));
      setTopics(_new_topic);
    }
  }, [research_topic]);

  const onPublicTopic = async (e: React.FormEvent, tempId: number) => {
    e.preventDefault();
    const topic_edit = topics.filter((t) => t.tempId == tempId);
    const update = await putResearchTopic(topic_edit[0]);
  };

  const onPublicStatement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statement) {
      window.alert("Need Statement");
      return;
    }
    const id = research_statement.length > 0 ? research_statement[0].id : null;
    const res = await putData({ statement: statement, media_url: statementImg, is_img: true, id: id });
    if (res) {
      window.alert("Add Statement Success.");
    }
  };

  const addForm = (): void => {
    setTopics([...topics, { media_url: "", title: "", description: "", is_img: true, tempId: new Date().getTime() }]);
  };
  const addBranch = (topicId: number): void => {
    const newBranch: researchBranch = { tempId: Date.now(), title: "", description: "", is_img: true, media_url: undefined };
    setTopics((prevTopics) => prevTopics.map((topic) => (topic.tempId === topicId ? { ...topic, ResearchBranches: [...(topic.ResearchBranches || []), newBranch] } : topic)));
    return;
  };
  const deleteForm = (topicId: number, branchId?: number): void => {
    const _topics = JSON.parse(JSON.stringify(topics));
    const targetTopicIndex = _topics.findIndex((topic) => topic.tempId == topicId);

    if (targetTopicIndex === -1) return; // Exit if topic not found

    if (branchId) {
      // Delete a specific branch from a topic
      _topics[targetTopicIndex].ResearchBranches = _topics[targetTopicIndex].ResearchBranches?.filter((branch) => branch.tempId !== branchId) || [];
    } else {
      // Delete an entire topic
      _topics.splice(targetTopicIndex, 1);
    }
    setTopics(_topics);
  };

  const updateBranchForm = (value: string, name: string, branchId: number, topicId: number) => {
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

  const onUpdateTopicForm = (val: string, name: string, id: number) => {
    setTopics((prevTopics) => prevTopics.map((t) => (t.tempId === id ? { ...t, [name]: val } : t)));
  };
  // const myUpdater = ;
  //

  return (
    <div>
      <FormBox title="Edit Research Statement">
        <div className="mb-4">
          <UploadImgComponent initialImages={[statementImg]} setImages={(img_res) => setStatementMedia(img_res[0])} />
        </div>

        <form onSubmit={onPublicStatement} className="">
          <FormDescriptionInput required name="statement" placeholder="Research Statement" value={statement} onChange={(val) => setStatement(val)} />
          <FormSubmit title="Publish" />
        </form>
      </FormBox>

      {topics.map((topic, id) => (
        <FormBox title={topic.title} key={id}>
          <UploadImgComponent initialImages={[topic.media_url]} setImages={(res) => onUpdateTopicForm(res, "media_url", topic.tempId)} />
          <button onClick={() => deleteForm(topic.tempId)} className="absolute top-2 right-2  bg-red-500 text-white rounded-full p-1 ">
            <GoTrash />
          </button>

          <form onSubmit={(e) => onPublicTopic(e, topic.tempId)} className="mt-4">
            <FormInput required placeholder="Title" name="title" value={topic.title} id={topic.tempId} onChange={onUpdateTopicForm} />
            <FormDescriptionInput required placeholder="Research Statement" value={topic.description} onChange={(val, name) => onUpdateTopicForm(val, "description", topic.tempId)} />
            <button className="underline mb-8 font-medium" onClick={() => addBranch(topic.tempId)}>
              Add Branch
            </button>
            {topic.ResearchBranches &&
              topic.ResearchBranches.map((branch) => (
                <FormBox title={branch.title} key={branch.tempId}>
                  <button onClick={() => deleteForm(topic.tempId, branch.tempId)} className="absolute top-2 right-2  bg-red-500 text-white rounded-full p-1 ">
                    <GoTrash />
                  </button>
                  <UploadImgComponent initialImages={[branch.media_url]} setImages={(res) => updateBranchForm(res[0], "media_url", branch.tempId, topic.tempId)} />
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
      <button onClick={addForm} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded text-base">
        Add Research Topic
      </button>
    </div>
  );
};

export default AdminResearch;
