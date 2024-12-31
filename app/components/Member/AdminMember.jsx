import React, { useEffect, useState } from "react";
import UploadImgComponent from "../AdminHome/UploadImgComponent";
import FormInput from "../admin-utils/form-input";
import FormSubmit from "../admin-utils/FormSubmit";
import FormDescriptionInput from "../admin-utils/FormDescrption";
import FormBox from "../HOC/FormBox";
import { useFetchData } from "@/src/hooks/useFetchData";
import { ImgType } from "@/src/hooks/useImageUpload";
import Member, { MemberType } from "./Member";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TopicList, { TopicType } from "../Activities/TopicListAdmin";

const AdminMember = () => {
  const { data, putData, delData } = useFetchData("member");
  const { data: memberType } = useFetchData("member-type");
  const [profImg, setProfImages] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [memberImg, setMemberImg] = useState([]);
  const [professor, setProfessor] = useState({
    name: "",
    email: "",
    phone: "",
    experiences: "",
  });
  // Swap members function that calls the backend
  const handleSwap = async (id, swipe_type) => {
    try {
      const response = await putData({ member_id: id, swipe_type }, "post");
      if (response.status === 200) {
        console.log("Members swapped successfully");
        // Refresh or handle success as needed
      }
    } catch (error) {
      console.error("Error swapping members:", error);
    }
  };

  useEffect(() => {
    if (data.length == 0) return;
    const _prof = data.filter((d) => !Boolean(d.MemberTypeId));
    if (_prof.length > 0) {
      let _prof_data = _prof[0].members_list[0];
      setProfessor(_prof_data);
      setProfImages([_prof_data.img_url]);
    }
  }, [data]);

  const [member, setMember] = useState({
    name: "",
    research_dir: "",
    email: "",
    role: "",
    graduate_paper: "",
    is_graduated: false,
  });

  const onPublic = async (e, isProfessor) => {
    e.preventDefault();
    let img_url;
    if ((profImg && isProfessor) || (!isProfessor && memberImg)) {
      img_url = isProfessor ? profImg[0] : memberImg[0];
    }
    let spreadData = isProfessor ? professor : member;
    const res = await putData({ ...spreadData, img_url: img_url, role_id: selectedRole });
    if (res) {
      window.alert("添加成功！");
      onCancelEdit();
    }
  };

  const onChange = (type) => (val, name) => {
    if (!name) return;
    if (type == "professor") {
      setProfessor((prevProfessor) => ({ ...prevProfessor, [name]: val }));
    } else {
      setMember({ ...member, [name]: val });
    }
  };

  const onEdit = (member) => {
    if (isEditing) {
      const confirmLeave = window.confirm("正在編輯，確定離開嗎？");
      if (!confirmLeave) {
        return;
      }
    }
    setMember(member);
    setMemberImg([member.img_url]);
    setSelectedRole(member.MemberTypeId);
    setIsEditing(true);
    const element = document.getElementById(`admin-edit-member`);
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 200;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  };

  const onDelete = (id) => {
    delData({ id: id });
  };
  const handleGraduate = () => {};
  const onCancelEdit = () => {
    setMember({
      name: "",
      research_dir: "",
      email: "",
      role: "",
      graduate_paper: "",
    });
    setSelectedRole("");
    setMemberImg([]);
    setIsEditing(false);
  };
  return (
    <div>
      <FormBox title="Edit Professor">
        <div className="flex flex-row   ">
          <div className="w-2/12">
            <UploadImgComponent initialImages={profImg} setImages={setProfImages} />
          </div>
          <form onSubmit={(e) => onPublic(e, true)} className="w-10/12 ">
            <FormInput name="name" required placeholder="Name" value={professor.name} onChange={onChange("professor")} />
            <FormInput name="email" required placeholder="Email" value={professor.email} onChange={onChange("professor")} />
            <FormInput name="phone" required placeholder="Phone" value={professor.phone} onChange={onChange("professor")} />
            <FormDescriptionInput name="experiences" required placeholder="Experience" value={professor.experiences} onChange={onChange("professor")} />

            <FormSubmit title="Publish" />
          </form>
        </div>
      </FormBox>
      {/* <div className="max-w-3xl"> */}
      <FormBox title="Add Member" id="admin-edit-member">
        <div className="flex flex-row  gap-x-8  ">
          <div className="w-2/12">
            <UploadImgComponent initialImages={memberImg} setImages={setMemberImg} />
          </div>
          <form onSubmit={(e) => onPublic(e, false)} className="w-10/12 ">
            <FormInput required placeholder="Name" name={"name"} value={member.name} onChange={onChange("member")} />
            <FormInput required placeholder="Research Direction" name={"research_dir"} value={member.research_dir} onChange={onChange("member")} />

            {member.is_graduated && <FormInput name="graduate_paper" placeholder="畢業論文 鏈接" value={member.graduate_paper} onChange={onChange("member")} />}
            <FormInput required placeholder="Email" value={member.email} name="email" onChange={onChange("member")} />
            <div className="flex flex-row gap-x-2 pb-2">
              Is Graduated:
              <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer  ${member.is_graduated ? "bg-blue-500" : "bg-gray-300"}`} onClick={() => onChange("member")(!member.is_graduated, "is_graduated")}>
                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${member.is_graduated ? "translate-x-6" : "translate-x-0"}`}></div>
              </div>
            </div>
            <div className="mb-6">
              <select id="eventType" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="shadow border rounded text-sm  py-2 pl-2 pr-12  pt-3    focus:shadow-outline">
                <option value="" disabled className="text-left text-sm">
                  Role
                </option>
                {memberType.map((member, id) => (
                  <option value={member.id} key={id}>
                    {member.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-x-4">
              {isEditing && (
                <button type="submit" className=" text-base   focus:shadow-outline " onClick={onCancelEdit}>
                  ❌ Cancel Edit
                </button>
              )}
              <FormSubmit title={isEditing ? "Update" : "Add Member"} />
            </div>
          </form>
        </div>
      </FormBox>
      <div className="max-w-lg">
        <TopicList topic_type={TopicType.MEMBER} />
      </div>
      <div className="w-11/12 mx-auto">
        {data
          .filter((memberGp) => memberGp.MemberTypeId)
          .map((memberGp, groupId) => (
            <div key={groupId} className="w-full  mb-8 mt-12 flex flex-col justify-center">
              <h4 className="text-center text-2xl font-bold text-header-purple mb-4 ">{memberGp.role}</h4>
              <div className=" flex flex-wrap justify-center max-w-[calc(4*(220px+20px))] gap-8 mx-auto" style={{ columnGap: 30 }}>
                {memberGp.members_list.map((member, memberId) => (
                  <div  key={memberId}>
                    <Member {...member} handleClick={() => onEdit(member)} handleDelete={() => onDelete(member.id)} />
                    <button onClick={() => handleSwap(member.id, "left")} className="">
                      <ArrowLeft />
                    </button>

                    <button onClick={() => handleSwap(member.id, "right")} className="">
                      <ArrowRight />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      {/* </div> */}
    </div>
  );
};
export default AdminMember;
