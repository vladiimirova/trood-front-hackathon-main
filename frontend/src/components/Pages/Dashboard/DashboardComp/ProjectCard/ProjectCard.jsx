function ProjectCard({ project }) {
  return (
    <div className="bg-white w-[508px]  rounded-[24px] pt-[32px] pl-[34px] pb-[17px] font-aeroport">
      <p className="font-500 text-[24px] mb-[23px] mr-[94px]">{project.name}</p>
      <div className="font-400 text-[16px] flex flex-col gap-[15px]">
        <div className="flex gap-[15px]">
          <div className="w-[4px] h-[25px] bg-[#E8EBEA]"></div>
          <p>{project.description}</p>
        </div>
        <div className="flex gap-[15px]">
          <div className="w-[4px] h-[25px] bg-[#E8EBEA]"></div>
          <p>Deadline: {project.deadline}</p>
        </div>
        <div className="flex gap-[15px]">
          <div className="w-[4px] h-[25px] bg-[#E8EBEA]"></div>
          <p>Field: {project.field}</p>
        </div>
        <div className="flex gap-[15px]">
          <div className="w-[4px] h-[25px] bg-[#E8EBEA]"></div>
          <p>Experience: {project.experience}</p>
        </div>
      </div>
      <div className="flex justify-end mr-[22px] mt-[50px]">
        <img
          src="./icons/iconoir_message-solid.svg"
          alt="iconoir_message-solid"
        />
        <img
          src="./icons/mingcute_notification-fill.svg"
          alt="mingcute_notification-fill"
          className="ml-[17px]"
        />
      </div>
    </div>
  );
}

export default ProjectCard;
