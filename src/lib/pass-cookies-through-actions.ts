import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const passCookiesThroughActions = async (
  passedCookies: string[],
  cookies: () => Promise<ReadonlyRequestCookies>,
) => {
  // Set each cookie for the client
  if (passedCookies && passedCookies.length > 0) {
    // Get the cookies object by awaiting the Promise
    const cookiesObj = await cookies();

    // Parse each Set-Cookie header and set in the response
    passedCookies.forEach((cookieString) => {
      // Extract just the name and value from the start of the cookie string
      const cookieParts = cookieString.split(";");
      const nameValue = cookieParts[0].split("=");
      const name = nameValue[0].trim();
      const value = nameValue[1].trim();

      // Preserve the HttpOnly flag and other options
      const options = {
        httpOnly: false,
        secure: false,
        path: "/",
        maxAge: 300,
      };

      // Parse options from cookie string
      cookieParts.slice(1).forEach((part) => {
        const [optName, optValue] = part.split("=").map((s) => s.trim());
        if (optName.toLowerCase() === "httponly") {
          options.httpOnly = true;
        } else if (optName.toLowerCase() === "secure") {
          options.secure = true;
        } else if (optName.toLowerCase() === "path") {
          options.path = optValue || "/";
        } else if (optName.toLowerCase() === "maxage") {
          options.maxAge = parseInt(optValue, 10);
        }
      });

      // Set the cookie in the Next.js response
      cookiesObj.set(name, value, options);
    });
  }
};
