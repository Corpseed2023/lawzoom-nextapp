import api from "@/app/httpRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createEnquiry = createAsyncThunk("createEnquiry", async (data) => {
  const response = await api.post(`/api/auth/createEnquiry`, data);
  return response.data;
});

export const getAllRoles = createAsyncThunk("getAllRoles", async () => {
  const response = await api.get(`/api/auth/role/getAllRoles`);
  return response.data;
});

export const getAllCountries = createAsyncThunk("getAllCountries", async () => {
  const response = await api.get(`/api/auth/countries/fetch-all-countries`);
  return response.data;
});

export const getStatesByCountryId = createAsyncThunk(
  "getStatesByCountryId",
  async (id) => {
    const response = await api.get(
      `/api/auth/states/fetch-all-states?countryId=${id}`
    );
    return response.data;
  }
);

export const getCitiesByStateId = createAsyncThunk(
  "getCitiesByStateId",
  async (id) => {
    const response = await api.get(
      `/api/auth/city/get-all-cities?stateId=${id}`
    );
    return response.data;
  }
);

export const createCountry = createAsyncThunk("createCountry", async (data) => {
  const response = await api.post(
    `/api/auth/countries/create-country?countryName=${data?.countryName}&countryCode=${data?.countryCode}`
  );
  return response.data;
});

export const updateCountry = createAsyncThunk("updateCountry", async (data) => {
  const response = await api.put(`/api/auth/countries/update-country`, data);
  return response.data;
});

export const createStatesForCountry = createAsyncThunk(
  "createStatesForCountry",
  async (data) => {
    const response = await api.post(
      `/api/auth/states/create-state?countryId=${data?.countryId}&stateName=${data?.stateName}`
    );
    return response.data;
  }
);

export const updateStatesForCountry = createAsyncThunk(
  "updateStatesForCountry",
  async (data) => {
    const response = await api.put(`/api/auth/states/update-states`, data);
    return response.data;
  }
);

export const createCities = createAsyncThunk("createCities", async (data) => {
  const response = await api.post(
    `/api/auth/city/save-cities?cityName=${data?.cityName}&cityCode=${data?.cityCode}&stateId=${data?.stateId}`
  );
  return response.data;
});

export const updateCities = createAsyncThunk("updateCities", async (data) => {
  const response = await api.put(`/api/auth/city/update-city`, data);
  return response.data;
});

const commonSlice = createSlice({
  name: "common",
  initialState: {
    enquiryLoading: "",
    allRoles: [],
    countries: [],
    loading: "",
  },
  extraReducers: (builder) => {
    builder.addCase(createEnquiry.pending, (state, action) => {
      state.enquiryLoading = "pending";
    });
    builder.addCase(createEnquiry.fulfilled, (state, action) => {
      state.enquiryLoading = "success";
    });
    builder.addCase(createEnquiry.rejected, (state, action) => {
      state.enquiryLoading = "rejected";
    });

    builder.addCase(getAllRoles.pending, (state, action) => {
      state.enquiryLoading = "pending";
    });
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      state.enquiryLoading = "success";
      state.allRoles = action?.payload?.body;
    });
    builder.addCase(getAllRoles.rejected, (state, action) => {
      state.enquiryLoading = "rejected";
    });

    builder.addCase(getAllCountries.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.loading = "success";
      state.countries = action?.payload;
    });
    builder.addCase(getAllCountries.rejected, (state, action) => {
      state.loading = "rejected";
    });
  },
});

export default commonSlice.reducer;
