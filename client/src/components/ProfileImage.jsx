import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileImageWithoutAuth } from "../slices/profileSlice";

function ProfileImage() {
  const dispatch = useDispatch();
  const { image, status, error } = useSelector((state) => state.profile);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch the profile image URL without authentication when the component mounts
    dispatch(fetchProfileImageWithoutAuth());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setImageUrl(image);
    }
  }, [status, image]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center lg:w-[30vw] lg:h-[30vw] lg:absolute lg:left-[63%] lg:top-1 md:w-[35vw] md:h-[35vw] md:absolute md:left-[60%]">
      <div className="w-[70vw] h-[70vw] lg:h-[30vw] lg:w-[30vw] rounded-full border border-[#C399F9] flex items-center justify-center md:w-[35vw] md:h-[35vw]">
        <div className="w-[50vw] h-[50vw] lg:h-[22vw] lg:w-[22vw] rounded-full object-cover object-center overflow-hidden md:w-[25vw] md:h-[25vw]">
          <img
            src={imageUrl || "https://via.placeholder.com/128"}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
