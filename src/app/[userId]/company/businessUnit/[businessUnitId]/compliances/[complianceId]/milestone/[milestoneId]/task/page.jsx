import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import store from "@/app/redux-toolkit/store";
import { getAllTask } from "@/app/redux-toolkit/slices/complianceSlice";
const Task = dynamic(() => import("./Task"), { loading: () => <Loading /> });

const fetchAllTask = async (id) => {
  let data = [];
  try {
    const response = await store.dispatch(getAllTask(id));
    data = response.payload;
  } catch (err) {
    console.log("TASK ERROR", err);
    data = [];
  }
  return data;
};

const TaskPage = async ({ params }) => {
  const { milestoneId, userId } = await params;

  const data = await fetchAllTask(milestoneId);

  return (
    <>
      <Task data={data} milestoneId={milestoneId} userId={userId} />
    </>
  );
};

export default TaskPage;
