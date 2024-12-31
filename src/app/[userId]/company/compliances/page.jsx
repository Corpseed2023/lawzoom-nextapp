import React from "react";
import Compliances from "./Compliances";
import store from "@/app/redux-toolkit/store";
import { getAllCompliances } from "@/app/redux-toolkit/slices/complianceSlice";

const fetchCompliances = async (userId) => {
  let data = [];
  try {
    const response = await store.dispatch(getAllCompliances(userId));
    console.log('kcxbvslkjdblskjbg',response)
    data = response.payload;
  } catch (err) {
    console.log("Compliance error", err);
    data = [];
  }
  return data;
};

const CompliancesPage = async ({ params }) => {
  const { userId } = params;
  const data = await fetchCompliances(userId);

  console.log('jfbvkjashbdvkjshbh',data,userId)
  return (
    <>
      <Compliances data={data} userId={userId} />
    </>
  );
};

export default CompliancesPage;
