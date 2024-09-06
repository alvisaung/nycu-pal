import React, { useEffect, useState } from "react";
import UploadImgComponent from "../AdminHome/UploadImgComponent";
import FormInput from "../admin-utils/form-input";
import FormSubmit from "../admin-utils/FormSubmit";
import FormDescriptionInput from "../admin-utils/FormDescrption";
import FormBox from "../HOC/FormBox";
import { useFetchData } from "@/src/hooks/useFetchData";
import { ImgType } from "@/src/hooks/useImageUpload";
import Member, { MemberType } from "./Member";
import { role } from "@/src/types/constants";

const AdminMember = () => {
  const { data, putData } = useFetchData("member");
  const [profImg, setProfImages] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [memberImg, setMemberImg] = (useState < string) | (null > null);

  const [professor, setProfessor] = useState({
    name: "",
    email: "",
    phone: "",
    experiences: "",
  });
  useEffect(() => {
    if (data.length == 0) return;
    const _prof = data.filter((d) => d.role == role.professor.key);
    if (_prof.length > 0) {
      let _prof_data = _prof[0].members_list[0];
      setProfessor(_prof_data);
    }
  }, [data]);

  const [member, setMember] = useState({
    name: "",
    research_dir: "",
    email: "",
    role: "",
  });

  const onPublic = async (e, isProfessor) => {
    e.preventDefault();
    let img_url;
    if ((profImg && isProfessor) || (!isProfessor && memberImg)) {
      img_url = isProfessor ? profImg.url : memberImg.url;
    }
    let spreadData = isProfessor ? professor : member;
    const res = await putData({ ...spreadData, img_url: img_url, role: isProfessor ? role.professor.key : selectedRole });
    if (res) {
      setMember({
        name: "",
        research_dir: "",
        email: "",
        role: "",
      });
      setIsEditing(false);
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
    setMember(member);
    setSelectedRole(member.role);
    setIsEditing(true);
  };
  const onCancelEdit = () => {
    setMember({
      name: "",
      research_dir: "",
      email: "",
      role: "",
    });
    setIsEditing(false);
  };
  return (
    <div>
      <FormBox title="Edit Professor">
        <div className="flex flex-row   ">
          <div className="w-2/12">
            <UploadImgComponent initialImages={profImg} setImages={(res) => setProfImages(res)} />
          </div>
          <form onSubmit={(e) => onPublic(e, true)} className="w-10/12 ">
            <FormInput name="name" required placeholder="Name" value={professor.name} onChange={onChange("professor")} />
            <FormInput name="email" required placeholder="Email" value={professor.email} onChange={onChange("professor")} />
            <FormInput isNumeric name="phone" required placeholder="Phone" value={professor.phone} onChange={onChange("professor")} />
            <FormDescriptionInput name="experiences" required placeholder="Experience" value={professor.experiences} onChange={onChange("professor")} />

            <FormSubmit title="Publish" />
          </form>
        </div>
      </FormBox>
      {/* <div className="max-w-3xl"> */}
      <FormBox title="Add Member">
        <div className="flex flex-row  gap-x-8  ">
          <div className="w-2/12">
            <UploadImgComponent initialImages={[memberImg]} setImages={(res) => setMemberImg(res[0])} />
          </div>
          <form onSubmit={(e) => onPublic(e, false)} className="w-10/12 ">
            <FormInput required placeholder="Name" name={"name"} value={member.name} onChange={onChange("member")} />
            <FormInput required placeholder="Research Direction" name={"research_dir"} value={member.research_dir} onChange={onChange("member")} />
            <FormInput required placeholder="Email" value={member.email} name="email" onChange={onChange("member")} />
            <div className="mb-6">
              <select id="eventType" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="shadow border rounded text-sm  py-2 pl-2 pr-12  pt-3    focus:shadow-outline">
                <option value="" disabled className="text-left text-sm">
                  Role
                </option>
                {Object.keys(role).map(
                  (roleKey, id) =>
                    roleKey != "professor" && (
                      <option value={role[roleKey].key} key={id}>
                        {role[roleKey].value}
                      </option>
                    )
                )}
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
      <div className="w-11/12 mx-auto">
        {data
          .filter((memberGp) => memberGp.role !== role.professor.key)
          .map((memberGp, id) => (
            <div key={id} className="w-full  mb-8 mt-12 flex flex-col justify-center">
              <h4 className="text-center text-2xl font-bold text-header-purple mb-4 ">{role[memberGp.role].value}</h4>
              <div className=" flex flex-wrap justify-start max-w-[calc(4*(220px+30px))] gap-8 mx-auto" style={{ columnGap: 30 }}>
                {memberGp.members_list.map((member, idm) => (
                  <Member {...member} key={idm} handleClick={() => onEdit(member)} />
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
