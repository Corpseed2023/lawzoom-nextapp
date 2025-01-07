import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllCountries } from "@/app/redux-toolkit/slices/commonSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const Countries = dynamic(() => import("./Countries"), {
  loading: () => <Loading />,
});

const CountriesPage = async ({ params }) => {
  const { userId } = await params;
  let data = [];
  try {
    const response = await store.dispatch(getAllCountries());
    data = response.payload;
    console.log("jhsbajkcbkjbsjbd", response);
  } catch (err) {
    console.log("Error in countries", err);
  }

  return (
    <>
      <Countries data={data} userId={userId} />
    </>
  );
};

export default CountriesPage;
