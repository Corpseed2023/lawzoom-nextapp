import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllCompliances } from "@/app/redux-toolkit/slices/complianceSlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { userSubscriberId } from "@/app/commonConstants";

const BusinessUnit=dynamic(()=>import('./BusinessUnit'),{loading:()=><Loading/>})

const fetchCompliances = async (userId, subscriberId) => {
  let data = [];
  try {
    const response = await store.dispatch(
      getAllCompliances({ userId, subscriberId })
    );
    console.log("kcxbvslkjdblskjbg", response);
    data = response.payload;
  } catch (err) {
    console.log("Compliance error", err);
    data = [];
  }
  return data;
};

const BusinessUnitPage = async ({ params }) => {
  const { userId } = await params;
  const subscriberId= await userSubscriberId()
  const data = await fetchCompliances(userId, subscriberId);

  console.log("jfbvkjashbdvkjshbh", data, userId);
  return (
    <>
      <BusinessUnit data={data} userId={userId} />
    </>
  );
};

export default BusinessUnitPage;
