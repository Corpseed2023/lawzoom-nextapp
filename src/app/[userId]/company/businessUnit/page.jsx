import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllCompliances } from "@/app/redux-toolkit/slices/complianceSlice";
import BusinessUnit from "./BusinessUnit";

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

const BusinessUnitPage = async ({ params }) => {
  const { userId } = params;
  const data = await fetchCompliances(userId);

  console.log('jfbvkjashbdvkjshbh',data,userId)
  return (
    <>
      <BusinessUnit data={data} userId={userId} />
    </>
  );
};

export default BusinessUnitPage;
