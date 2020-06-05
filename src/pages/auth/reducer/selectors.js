import jwt from "utils/jwt";

export const isLoggedIn = auth => {
  const { accessToken } = auth;

  return jwt.isValid(accessToken);
};
export const isUserLoaded = auth => {
  const { user } = auth;
  return typeof user === "object";
};
