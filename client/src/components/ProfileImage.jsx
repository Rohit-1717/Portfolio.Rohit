import React from "react";

function ProfileImage() {
  return (
    <div className=" h-screen w-full flex items-center justify-center lg:w-[30vw] lg:h-[30vw] lg:absolute lg:left-[63%] lg:top-1 md:w-[35vw] md:h-[35vw] md:absolute md:left-[60%]">
      <div className="w-[70vw] h-[70vw] lg:h-[30vw] lg:w-[30vw] rounded-full border border-[#C399F9] flex items-center justify-center md:w-[35vw] md:h-[35vw]">
        <div className="w-[50vw] h-[50vw] lg:h-[22vw] lg:w-[22vw] rounded-full  object-cover object-center overflow-hidden md:w-[25vw] md:h-[25vw]">
          <img
            src="https://res.cloudinary.com/rohitcloudinary/image/upload/v1720817420/My%20Portfolio%20Website%20Assets/ozsggedv2lgvlgrxwmoh.png"
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
