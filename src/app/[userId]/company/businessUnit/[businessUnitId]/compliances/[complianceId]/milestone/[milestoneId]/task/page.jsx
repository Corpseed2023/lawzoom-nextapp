import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import store from "@/app/redux-toolkit/store";
import { getAllTask } from "@/app/redux-toolkit/slices/complianceSlice";
import { userSubscriberId } from "@/app/commonConstants";
import { getAllEmployeesByUserId } from "@/app/redux-toolkit/slices/employeesSlice";
const Task = dynamic(() => import("./Task"), { loading: () => <Loading /> });

const fetchAllTask = async (id) => {
  let data = [];
  try {
    const response = await store.dispatch(getAllTask(id));
    data = response.payload;
    console.log("TASK ERROR", response);
  } catch (err) {
    console.log("TASK ERROR", err);
    data = [];
  }
  return data;
};

const getTeamMemberList = async (userId, subscriberId) => {
  let data = [];
  try {
    const response = await store.dispatch(
      getAllEmployeesByUserId({ userId, subscriberId })
    );
    data = response.payload;
  } catch (err) {
    console.log("TEAM MEMBER ERROR", err);
    data = [];
  }
  return data;
};

const TaskPage = async ({ params }) => {
  const { milestoneId, userId } = await params;
  const subscriberId = await userSubscriberId();
  const data = await fetchAllTask(milestoneId);
  const userList = await getTeamMemberList(userId, subscriberId);


  console.log('GYJHGKJHGKJFGKJF',data)

  return (
    <>
      <Task
        data={data}
        milestoneId={milestoneId}
        userId={userId}
        subscriberId={subscriberId}
        userList={userList}
      />
    </>
  );
};

export default TaskPage;
