import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllCompanies } from "@/app/redux-toolkit/slices/companySlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
const ManageCompanies = dynamic(() => import("./ManageCompanies"), {
  loading: () => <h1>Loading .....</h1>,
});

const fetchAllCompanies = async (userId, subscriptionId) => {
  let data = [];
  try {
    const result = await store.dispatch(
      getAllCompanies({ userId, subscriptionId })
    );
    console.log("Fetch all companies error", result,userId,subscriptionId);
    data = result?.payload;
  } catch (err) {
    console.log("Fetch all companies error", err);
  }
  return data;
};

const ManageCompaniesPage = async ({ params }) => {
  const { userId } = await params;
  const data = await fetchAllCompanies(userId, SUBSCRIPTION_ID);

  console.log('as;ldhclaksjhlkdjg',data,userId)

  return (
    <>
      <ManageCompanies userId={userId} data={data} />
    </>
  );
};

export default ManageCompaniesPage;
