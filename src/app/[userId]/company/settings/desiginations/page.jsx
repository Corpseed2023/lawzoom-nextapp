import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllDesiginations } from "@/app/redux-toolkit/slices/settingSlice";
import Designation from "./Designation";


export const fetchDesiginations = async () => {
  let data = [];
  try {
    const response = await store.dispatch(getAllDesiginations()); 
    data = response?.payload;
    return data;
  } catch (err) {
    console.error("Error fetching desiginations:", err);
    return [];
  }
};

const DesiginationPage = async ({ params }) => {
  const { userId } = params;
  const data = await fetchDesiginations();
  console.log("Desigination =======================>", data);

  return (
    <>
      <Designation
        data={data}
        userId={userId}
        // getDesigination={fetchDesiginations}
      />
    </>
  );
};

export default DesiginationPage;
