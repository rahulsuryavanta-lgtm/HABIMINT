import { callApi } from "@/lib/apiBase/api";
import { HOMEPAGE_API, URLGETMETHOD } from "@/lib/constants/ApiConstants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHomePageApi: any = createAsyncThunk<any, any>(
  "homePageStore/fetchHomePageApi",
  async ({}, { getState, dispatch }) => {
    dispatch(handleHomePageLoader(true));
    try {
      const response = await callApi<any>({
        url: HOMEPAGE_API.GET,
        method: URLGETMETHOD,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

interface HomePageState {
  homePageData: any;
  total_records: number;
  homePageLoading: boolean;
}

const initialState: HomePageState = {
  homePageData: {} as any,
  total_records: 0,
  homePageLoading: true,
};

export const homePageSlice = createSlice({
  name: "homePageStore",
  initialState,
  reducers: {
    handleHomePageLoader: (state, action) => {
      state.homePageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomePageApi.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {
        state.homePageData = action.payload?.response?.data || [];
        state.total_records = action.payload?.response?.data?.length || 0;
      }
      state.homePageLoading = false;
    });
  },
});

export const { handleHomePageLoader } = homePageSlice.actions;

export default homePageSlice.reducer;
