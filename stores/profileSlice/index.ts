import { callApi } from "@/lib/apiBase/api";
import {
  CUSTOMER_ADDRESS,
  PROFILE_URLS,
  URLDELETEMETHOD,
  URLGETMETHOD,
  URLPOSTMETHOD,
  URLPUTMETHOD,
} from "@/lib/constants/ApiConstants";
import { setLoginInfo } from "@/utils/getToken";
import useToast from "@/utils/useToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const { Success, Error } = useToast();

export const fetchLoginApi = async (params: any) => {
  try {
    const response = await callApi<any>({
      url: PROFILE_URLS.LOGIN,
      method: URLPOSTMETHOD,
      body: params,
    });
    return response;
  } catch (error) {
    console.warn("error: ", error);
  }
};

export const fetchCreateAccountApi = async (params: any) => {
  try {
    const response = await callApi<any>({
      url: PROFILE_URLS.CREATE_ACCOUNT,
      method: URLPOSTMETHOD,
      body: params,
    });
    return response;
  } catch (error) {
    console.warn("error: ", error);
  }
};

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await callApi<any>({
      url: PROFILE_URLS.GET_PROFILE,
      method: URLGETMETHOD,
      // body: params,
      token: token || null,
    });

    return response;
  } catch (error) {
    console.warn("error: ", error);
  }
};

export const fetchVerifyOtpApi: any = createAsyncThunk<any, any>(
  "profileStore/fetchVerifyOtpApi",
  async ({ params }, { getState, dispatch }) => {
    try {
      const response = await callApi<any>({
        url: PROFILE_URLS.VERIFY_OTP,
        method: URLPOSTMETHOD,
        body: params,
      });

      return { params, response };
    } catch (error) {
      console.warn("error: ", error);
      dispatch(handleOtpLoader(false));
    }
  }
);

export const fetchAddEditAddress: any = createAsyncThunk<any, any>(
  "profileStore/fetchAddEditAddress",
  async ({ params }, { getState, dispatch }) => {
    try {
      const response = await callApi<any>({
        url: params?.id ? CUSTOMER_ADDRESS.UPDATE : CUSTOMER_ADDRESS.ADD,
        method: params?.id ? URLPUTMETHOD : URLPOSTMETHOD,
        body: params,
      });

      return { params, response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchGetAddressList: any = createAsyncThunk<any, any>(
  "profileStore/fetchGetAddressList",
  async ({ params }, { getState, dispatch }) => {
    dispatch(handleAddressLoader(true));

    try {
      const response = await callApi<any>({
        url: CUSTOMER_ADDRESS.LIST,
        method: URLGETMETHOD,
      });

      return { params, response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchDeleteAddressList: any = createAsyncThunk<any, any>(
  "profileStore/fetchDeleteAddressList",
  async ({ params }, { getState, dispatch }) => {
    dispatch(handleAddressLoader(true));

    try {
      const response = await callApi<any>({
        url: CUSTOMER_ADDRESS.DELETE,
        method: URLDELETEMETHOD,
        body: params,
      });

      return { params, response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

interface ProfileState {
  otpLoader: boolean;
  userAddress: any;
  userAddressLoader: boolean;
}

const initialState: ProfileState = {
  otpLoader: false,
  userAddress: [],
  userAddressLoader: false,
};

export const profileSlice = createSlice({
  name: "profileStore",
  initialState,
  reducers: {
    handleOtpLoader: (state, action) => {
      state.otpLoader = action.payload;
    },
    handleAddressLoader: (state, action) => {
      state.userAddressLoader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVerifyOtpApi.fulfilled, (state, action) => {
      state.otpLoader = false;
      if (
        action.payload.response?.status_code === 200 &&
        action.payload.response?.data?.login_token
      ) {
        Success("Logged in successfully 🎉");
        setLoginInfo(action.payload.response?.data);
        window.location.href = "/";
      }
    });
    builder.addCase(fetchVerifyOtpApi.rejected, (state) => {
      state.otpLoader = false;
    });

    builder.addCase(fetchGetAddressList.fulfilled, (state, action) => {
      state.userAddressLoader = false;
      if (
        action.payload.response?.status_code === 200 &&
        action.payload.response?.data
      ) {
        state.userAddress = action.payload.response?.data;
      }
    });

    builder.addCase(fetchAddEditAddress.fulfilled, (state, action) => {
      state.userAddressLoader = false;
      if (
        action.payload.response?.status_code === 200 &&
        action.payload.response?.data
      ) {
        state.userAddress = action.payload.response?.data;
      }
    });
    builder.addCase(fetchDeleteAddressList.fulfilled, (state, action) => {
      state.userAddressLoader = false;
      if (
        action.payload.response?.status_code === 200 &&
        action.payload.response?.data
      ) {
        state.userAddress = action.payload.response?.data;
      }
    });
  },
});

export const { handleOtpLoader, handleAddressLoader } = profileSlice.actions;

export default profileSlice.reducer;
