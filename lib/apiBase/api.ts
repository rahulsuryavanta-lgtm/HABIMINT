// import { removeToken } from "@/utils/getToken";
import axios, { Method } from "axios";
import FormData from "form-data";
import Cookies from "universal-cookie";
import { API_MESSAGE } from "../constants/GlobalConstant";
import { removeToken } from "@/utils/getToken";
import useToast from "@/utils/useToast";

const cookies = new Cookies();

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const { Success, Error } = useToast();

interface APIPARAMETER {
  url: string;
  method: Method;
  body?: any;
  headers?: any;
  token?: string | null;
}

export async function callApi<T>({
  url,
  method,
  body,
  headers,
  token,
}: APIPARAMETER): Promise<T | null> {
  let finalPostData;

  if (body?.file || body?.files) {
    let formData = new FormData();
    // formData.append('file', body.file);
    Object.keys(body).forEach((key) => {
      if (Array.isArray(body[key])) {
        body[key].forEach((item: any) => {
          formData.append(`${key}`, item);
        });
      } else {
        formData.append(key, body[key]);
      }

      // if (key === "files") {
      //     for (let i = 0; i < body.files.length; i++) {
      //         formData.append('files', body.files[i]);
      //     }

      // } else {
      //     if (Array.isArray(body[key])) {
      //         body[key].forEach((item: any) => {
      //             formData.append(`${key}[]`, item);
      //         });
      //     } else {
      //         formData.append(key, body[key]);
      //     }
      // }
    });

    finalPostData = formData;
  } else {
    finalPostData = body;
  }

  const authHeader = token ? token : cookies.get("habi_token") || "";

  // const authHeader = process.env.NEXT_PUBLIC_TEMP_TOKEN
  // encrypted was used to pass in header but later it is removed

  let headersData = {
    ...headers,
    // "Cache-Control": "no-cache",
    // Pragma: "no-cache",
    // Expires: "0",
  };

  if (authHeader) {
    headersData = { ...headersData, "login-token": authHeader };
  }
  const configData = {
    method,
    url: API_URL + url,
    data: finalPostData,
    headers: headersData,
  };

  return axios(configData)
    .then((result) => {
      if (result.status === 200) {
        if (result.data) {
          return result.data;
        }
      }
    })
    .catch(async (error) => {
      if (error?.response?.status === 417) {
        Error(error?.response?.data?.message);
        setTimeout(() => {
          removeToken();
        }, 1000);
      } else {
        error?.response?.data?.message && Error(error?.response?.data?.message);
      }
    });
}
