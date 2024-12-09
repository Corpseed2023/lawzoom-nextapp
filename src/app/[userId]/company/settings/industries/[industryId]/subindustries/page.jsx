import React from 'react'
import SubIndustries from './SubIndustries';
import store from '@/app/redux-toolkit/store';
import { getSubIndustryById } from '@/app/redux-toolkit/slices/settingSlice';


const SubIndustriesPage = async({params}) => {
    const { userId,industryId } = params;
    let data = [];
    try {
      const response = await store.dispatch(getSubIndustryById(industryId));
      data = response?.payload;
      console.log("Sub Industry data", response);
    } catch (err) {
      console.log(" Sub Industry error", err);
    }


    console.log('SubIndusty Data',data)
  return (
    <>
      <SubIndustries data={data} userId={userId}  industryId={industryId} />
    </>
  )
}

export default SubIndustriesPage
