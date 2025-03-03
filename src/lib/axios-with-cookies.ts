import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import axios, { AxiosInstance } from "axios";
import { SERVER_ADDRESS } from "./apis";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const axiosWithCookies = async (
  cookies: RequestCookie[],
): Promise<AxiosInstance> => {
  const jar = new CookieJar();

  cookies.forEach((cookie) => {
    jar.setCookieSync(`${cookie.name}=${cookie.value}`, SERVER_ADDRESS);
  });

  const client = wrapper(
    axios.create({
      jar,
      baseURL: SERVER_ADDRESS,
    }),
  );

  return client;
};
