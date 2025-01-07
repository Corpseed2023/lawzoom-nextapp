import React from "react";
import { getStatesByCountryId } from "@/app/redux-toolkit/slices/commonSlice";
import store from "@/app/redux-toolkit/store";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const States = dynamic(() => import("./States"), {
  loading: () => <Loading />,
});

const StatesPage = async ({ params }) => {
  const { userId, countryId } = params;
  console.log("sdkvjnasdkvnasdk", params);
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
