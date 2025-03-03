export const SERVER_ADDRESS = "http://localhost:5000/api/v1";

export const apis = {
  auth: {
    register: "/auth/register-user",
    login: "/auth/login",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
  },
  otp: {
    requestOtp: "/otp/request-otp",
    verifyOtp: "/otp/verify-otp",
  },
};
