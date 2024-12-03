import AgentDashboard from "@/components/AgentDashboard";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] bg-white">
      {" "}
      <AgentDashboard />
    </div>
  );
};

export default page;
