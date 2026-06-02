import { BlogList_Int } from "@/interface/BlogInterface";
import { callApi } from "@/lib/apiBase/api";
import {
  BLOG_API,
  HOMEPAGE_API,
  URLGETMETHOD,
  URLPOSTMETHOD,
  URLPUTMETHOD,
} from "@/lib/constants/ApiConstants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBlogListApi: any = createAsyncThunk<any, any>(
  "blogStore/fetchBlogListApi",
  async ({ search }, { getState, dispatch }) => {
    dispatch(handleBlogListLoader(true));
    try {
      const response = await callApi<any>({
        url: `${BLOG_API.GET}${search ? `?search=${search}` : ""}`,
        method: URLGETMETHOD,
        body: {},
      });

      return { search, response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchNewsletterApi = async (params: string) => {
  try {
    const response = await callApi<any>({
      url: `${HOMEPAGE_API.SUBSCRIBE_NEWSLETTER}`,
      method: URLPOSTMETHOD,
      body: {
        email: params,
      },
    });
    return response;
  } catch (error) {
    console.warn("error: ", error);
  }
};

interface BlogState_Int {
  blogData: BlogList_Int[];
  total_records: number;
  blogLoading: boolean;
}

const initialState: BlogState_Int = {
  blogData: [] as any[],
  total_records: 0,
  blogLoading: true,
};

export const blogSlice = createSlice({
  name: "blogStore",
  initialState,
  reducers: {
    handleBlogListLoader: (state, action) => {
      state.blogLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogListApi.fulfilled, (state, action) => {
      state.blogData = action.payload?.response?.data || [];
      state.total_records = action.payload?.response?.total_count || 0;
      state.blogLoading = false;
    });
  },
});

export const { handleBlogListLoader } = blogSlice.actions;

export default blogSlice.reducer;
