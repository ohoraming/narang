import { ModelValue } from "../../models/IModel";

export const FIND_ALL = "users";
export const FIND_ONE = "user";
export const SIGNIN = "user/signin";

export const USER_URL = {
  FIND_ALL: { url: `/api/${FIND_ALL}`, method: "get" },
  FIND_BY_ID: { url: `/api/${FIND_ONE}`, method: "get" },
  FIND_BY_NICKNAME: { url: `/api/${FIND_ONE}/nickname`, method: "get" },
  FIND_BY_EMAIL: { url: `/api/${FIND_ONE}/email`, method: "get" },
  SIGNIN_BY_EMAIL: { url: `/api/${SIGNIN}`, method: "post" },
  INSERT: { url: `/api/${FIND_ONE}`, method: "post" },
  UPDATE: { url: `/api/${FIND_ONE}`, method: "put" },
  DELETE: { url: `/api/${FIND_ONE}`, method: "delete" },
};

export type UserGET = "FIND_ALL" | "FIND_BY_ID" | "FIND_BY_EMAIL";
export type UserPOST = "INSERT";
export type UserPUT = "UPDATE";
export type UserDELETE = "DELETE";

export interface Params {
  pathVariable?: string;
  querys?: Map<string, ModelValue>;
}
