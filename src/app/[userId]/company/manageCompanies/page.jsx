import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllCompanies } from "@/app/redux-toolkit/slices/companySlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { userSubscriberId } from "@/app/commonConstants";

const ManageCompanies = dynamic(() => import("./ManageCompanies"), {
  loading: () => <Loading />,
});

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
  const { userId } = await params;
  const subscriberId = await userSubscriberId();
  const data = await fetchAllCompanies(userId, subscriberId);

  return (
    <>
      <ManageCompanies userId={userId} data={data} subscriberId={subscriberId} />
    </>
  );
};

export default ManageCompaniesPage;
