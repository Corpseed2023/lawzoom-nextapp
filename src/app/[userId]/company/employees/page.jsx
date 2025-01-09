import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllEmployeesByUserId } from "@/app/redux-toolkit/slices/employeesSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { userSubscriberId } from "@/app/commonConstants";
const Employees = dynamic(() => import("./Employees"), {
  loading: () => <Loading />,
});

const fetchAllEmployees = async (userId, subscriberId) => {
  let data = [];
  try {
    const response = await store.dispatch(
      getAllEmployeesByUserId({ userId, subscriberId })
    );
    data = response.payload;
  } catch (err) {
    console.log(err);
  }
  return data;
};

const EmployeesPage = async ({ params }) => {
  const { userId } = await params;
  const subscriberId=await userSubscriberId()
  const data = await fetchAllEmployees(userId,subscriberId);
  console.log('sajdkfbaskjbj',data)
  return (
    <>
      <Employees data={data} userId={userId} subscriberId={subscriberId} />
    </>
  );
};

export default EmployeesPage;
