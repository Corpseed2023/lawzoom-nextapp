import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllEmployeesByUserId } from "@/app/redux-toolkit/slices/employeesSlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
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
  const data = await fetchAllEmployees(userId, SUBSCRIPTION_ID);
  console.log('sajdkfbaskjbj',data)
  return (
    <>
      <Employees data={data} userId={userId} />
    </>
  );
};

export default EmployeesPage;
