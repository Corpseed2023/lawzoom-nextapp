import React from "react";
import ManageCompanies from "./ManageCompanies";
import store from "@/app/redux-toolkit/store";
import { getAllCompanies } from "@/app/redux-toolkit/slices/companySlice";
import { SUBSCRIPTION_ID } from "@/app/constants";

const fetchAllCompanies = async (userId, subscriptionId) => {
  let data = [];
  try {
    const result = await store.dispatch(
      getAllCompanies({ userId, subscriptionId })
    );
    data = result?.payload;
  } catch (err) {
    console.log("Fetch all companies error", err);
  }
  return data;
};

const ManageCompaniesPage = async ({ params }) => {
  const { userId } = params;
  const data = await fetchAllCompanies(userId, SUBSCRIPTION_ID);
  console.log('jfdbvsdjbvajsbd',data)
  return (
    <>
      <ManageCompanies userId={userId} data={data} />
    </>
  );
};

export default ManageCompaniesPage;
