import React from "react";
import States from "./States";
import { getStatesByCountryId } from "@/app/redux-toolkit/slices/commonSlice";
import store from "@/app/redux-toolkit/store";

const StatesPage = async ({ params }) => {
  const { userId, countryId } = params;
  console.log('sdkvjnasdkvnasdk',params)
  let data = [];
  try {
    const response = await store.dispatch(getStatesByCountryId(countryId));
    data = response?.payload;
    console.log("dkcjnskldjvhsklj", data);
  } catch (err) {
    console.log("Errrrorrrrr", err);
  }

  return (
    <>
      <States userId={userId} data={data} countryId={countryId} />
    </>
  );
};

export default StatesPage;
