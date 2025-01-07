import React from "react";
import store from "@/app/redux-toolkit/store";
import { getCitiesByStateId } from "@/app/redux-toolkit/slices/commonSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const Cities = dynamic(() => import("./Cities"), {
  loading: () => <Loading />,
});

const CitiesPage = async ({ params }) => {
  const { userId, countryId, stateId } = params;
  let data = [];
  try {
    const response = await store.dispatch(getCitiesByStateId(stateId));
    data = response?.payload;
    console.log("dkcjnskldjvhsklj", response.payload);
  } catch (err) {
    console.log("Errrrorrrrr", err);
  }
  return (
    <>
      <Cities
        userId={userId}
        countryId={countryId}
        stateId={stateId}
        data={data}
      />
    </>
  );
};

export default CitiesPage;
