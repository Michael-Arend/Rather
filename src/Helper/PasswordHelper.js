import crypto from "crypto-js";

export const hash = (password) => {
  return crypto.SHA256(password).toString();
};

export const compare = (password, hash) => {
  return crypto.SHA256(password).toString() === hash;
};
