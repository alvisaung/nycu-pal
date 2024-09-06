"use client";
import { useFetchData } from "@/src/hooks/useFetchData";
import { fetchData } from "@/src/services/dataService";
import React, { useEffect, useState } from "react";

interface Topic {
  id: number;
  title: string;
}
export enum TopicType {
  PUBLICATION = "Publication",
  EVENT = "Event",
}
interface TopicListAdminProps {
  topic_type: TopicType;
}

const TopicList: React.FC<TopicListAdminProps> = ({ topic_type }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const endpoint = topic_type == TopicType.EVENT ? "events-type" : "publication-type";
  const { data, putData, delData } = useFetchData(endpoint);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      putData(JSON.stringify({ title: newTopic.trim() }));
      setNewTopic("");
      setIsModalOpen(false);
    }
  };
  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setNewTopic(topic.title);
    setIsModalOpen(true);
  };
  const handleSaveEdit = async () => {
    if (editingTopic && newTopic.trim()) {
      putData(JSON.stringify({ title: newTopic.trim(), id: editingTopic.id }));

      setEditingTopic(null);
      setNewTopic("");
      setIsModalOpen(false);
    }
  };

  const handleRemoveTopic = async (id: number) => {
    try {
      delData(JSON.stringify({ id: id }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-full ">
      <h2 className="text-xl font-bold mb-4 " style={{ borderBottom: "1px solid #A3A3A3" }}>
        Topic
      </h2>
      <ul className="space-y-2 mb-4">
        {data.map((topic: Topic) => (
          <li key={topic.id} className="flex justify-between items-center">
            <span>{topic.title}</span>
            <div>
              <button onClick={() => handleEditTopic(topic)} className="text-blue-500 hover:text-blue-700 mr-2">
                ✎
              </button>
              <button onClick={() => handleRemoveTopic(topic.id)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => setIsModalOpen(true)} className="w-full py-2 px-4 text-base font-medium border-2 rounded hover:bg-custom-light-grey">
        Add Topic
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-4 px-8 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add New Topic</h3>
            <input type="text" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} className="w-full px-3 py-2 border rounded mb-4 text-lg" placeholder="Enter topic name" />
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={editingTopic ? handleSaveEdit : handleAddTopic} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {editingTopic ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicList;
