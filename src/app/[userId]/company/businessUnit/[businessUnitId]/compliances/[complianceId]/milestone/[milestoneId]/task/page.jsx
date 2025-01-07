import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const Task=dynamic(()=>import('./Task'),{loading:()=><Loading/>})

const TaskPage = async({ params }) => {
  const { milestoneId, userId } = await params;
  return (
    <>
      <Task  />
    </>
  );
};

export default TaskPage;
