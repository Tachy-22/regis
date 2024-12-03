import RegistrationForm from "@/components/forms/RegistrationForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] ">
      {" "}
      <RegistrationForm />
    </div>
  );
};

export default page;
