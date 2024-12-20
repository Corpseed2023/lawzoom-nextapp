import React from "react";
import Employees from "./Employees";
import store from "@/app/redux-toolkit/store";
import { getAllEmployeesByCompanyId } from "@/app/redux-toolkit/slices/employeesSlice";
import { SUBSCRIPTION_ID } from "@/app/constants";

const fetchAllEmployees = async (userId, subscriptionId) => {
  let data = [];
  try {
    const response = await store.dispatch(
      getAllEmployeesByCompanyId({ userId, subscriptionId })
    );
    data = response.payload;
  } catch (err) {
    console.log(err);
  }
  return data;
};

const EmployeesPage = async (params) => {
  const { userId } = params;
  const data = await fetchAllEmployees(userId, SUBSCRIPTION_ID);
  return (
    <>
      <Employees data={data} userId={userId} />
    </>
  );
};

export default EmployeesPage;
