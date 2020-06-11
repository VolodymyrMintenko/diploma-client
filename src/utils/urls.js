const host = process.env.REACT_APP_HOST_URL || "";
const urls = {
  signIn: `${host}/auth/signin`,
  signUp: `${host}/auth/signup`,
  campaigns: `${host}/campaigns`,
  user: `${host}/user`,
  userme: `${host}/user/me`,
  users: `${host}/users`,
};

export default urls;
