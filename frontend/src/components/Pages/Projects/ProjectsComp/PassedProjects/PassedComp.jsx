function PassedComp() {
    return (
      <div className="bg-white w-[508px]  rounded-[24px] pt-[32px] pl-[34px] pb-[17px] font-aeroport">
        <p className="font-normal text-[24px] mb-[23px] mr-[94px]">
          Creating visual materials for social media
        </p>
  
        <div className="flex justify-between items-center mr-[22px] mt-[50px]">
          <div className="flex">
            <img src="./icons/mdi_account.svg" alt="mdi_account" className="w-[20px] h-[20px] mr-[10px]"/>
            <p className="font-light text-[14px] text-gray-text">Anna Lenram</p>
          </div>
          <div  className="flex">
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
      </div>
    );
  }
  
  export default PassedComp;
  