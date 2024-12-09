import api from "@/app/httpRequest"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const addPeoples=createAsyncThunk('addPeoples',async(data)=>{
    const response=await api.post(`user/createTeamMember`,data)
    return response.data
})

export const addTeamMember=createAsyncThunk('addTeamMember',async(data)=>{
    const response=await api.post(`team/addTeamMember?companyId=${data?.companyId}&createdById=${data?.createdById}`,data)
    return response.data
})

const usersSlice=createSlice({
    name:'users',
    initialState:{},
    extraReducers:(builder)=>{
        
    }
})

export default usersSlice.reducer