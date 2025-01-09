import { cookies } from "next/headers";

export const userSubscriberId = async () => {
  const cookieStore = await cookies();
  const cookie = await cookieStore?.get("userDetails");

  if (cookie?.value) {
    try {
      const data = await JSON.parse(cookie.value);
      return data?.subscriberId; // Parse the JSON value of the cookie
    } catch (error) {
      console.error(`Error parsing cookie:`, error);
    }
  }

  return null; // Return null if the cookie is not found or cannot be parsed
};

export const userDetails = async () => {
  const cookieStore = await cookies();
  const cookie = await cookieStore?.get("userDetails");

  if (cookie?.value) {
    try {
      const data = await JSON.parse(cookie.value);
      return data // Parse the JSON value of the cookie
    } catch (error) {
      console.error(`Error parsing cookie:`, error);
    }
  }

  return null; // Return null if the cookie is not found or cannot be parsed
};
