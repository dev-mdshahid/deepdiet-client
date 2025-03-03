import { jwtDecode } from "jwt-decode";
export const getAccessToken = () => {
  const cookies = document.cookie.split(";");
  const accessTokenCookie = cookies.find((c) =>
    c.trim().startsWith("accessToken="),
  );
  if (accessTokenCookie) {
    return jwtDecode(accessTokenCookie.split("=")[1]);
  }
  return null;
};
