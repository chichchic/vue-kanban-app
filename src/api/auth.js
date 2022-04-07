import client from "./client";

export default {
  login: (authInfo) =>
    new Promise((resolve, reject) => {
      client
        .post("/auth/login", authInfo)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(new Error(err.data.message || err.message));
        });
    }),
};
