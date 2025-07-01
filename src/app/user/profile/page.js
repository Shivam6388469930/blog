// 

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    mobile: "",
    address: "",
  });
 
  useEffect(() => {
     const img = localStorage.getItem("Image");
    const storedName = localStorage.getItem("userName") || "Guest User";
    const storedEmail = localStorage.getItem("userEmail") || "guest@example.com";
    setUserImage(img && (img.startsWith("http") || img.startsWith("/")) ? img : "/avter.png");
    
    const storedGender = localStorage.getItem("userGender") || "";
    const storedMobile = localStorage.getItem("userMobile") || "";
    const storedAddress = localStorage.getItem("userAddress") || "";

    setFormData({
      fullName: storedName,
      email: storedEmail,
      gender: storedGender,
      mobile: storedMobile,
      address: storedAddress,
    });
  }, []);
   const [userImage, setUserImage] = useState("/avter.png");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName" || name === "email") return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save to localStorage (only the editable fields)
      localStorage.setItem("userGender", formData.gender);
      localStorage.setItem("userMobile", formData.mobile);
      localStorage.setItem("userAddress", formData.address);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="container mx-auto px-4 mt-20 mb-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold"
        >
          Your Profile
        </motion.h1>
      </div>

      {/* Profile & Details Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full lg:w-1/3 bg-white border border-gray-300 shadow-2xl rounded-xl p-6 flex flex-col items-center gap-4">
          <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-black rounded-full overflow-hidden">
            <Image
              src={userImage}
              alt="Avatar"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{formData.fullName}</h1>
          <p className="text-md text-gray-600">{formData.email}</p>
          {/* <div className="flex gap-3 mt-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-lg font-light px-5 py-2 rounded-lg transition duration-300 ease-in-out">
              Follow
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-lg font-light px-5 py-2 rounded-lg transition duration-300 ease-in-out">
              Message
            </button>
          </div> */}
        </div>

        {/* Details Card */}
        <div className="w-full lg:w-2/3 bg-white border border-gray-300 shadow-2xl rounded-xl p-4 max-h-[70vh] overflow-y-auto">
          {[
            ["Full Name", "fullName"],
            ["Email", "email"],
            ["Gender", "gender"],
            ["Mobile No.", "mobile"],
            ["Address", "address"],
          ].map(([label, key], index) => {
            const isReadOnly = key === "fullName" || key === "email";
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-2 md:gap-8 mb-4 items-start md:items-center"
              >
                <label className="w-32 md:w-40 font-medium">{label}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  disabled={!isEditing || isReadOnly}
                  className={`border border-gray-300 rounded-md px-3 py-2 text-base w-full md:w-3/4 bg-transparent ${
                    isEditing && !isReadOnly
                      ? "bg-white"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            );
          })}

          <div className="text-right mt-4">
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-lg font-light px-6 py-2 rounded-lg transition duration-300 ease-in-out"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

