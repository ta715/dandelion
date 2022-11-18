import { axios } from "../lib/axios";
import { UsersApi } from "../types/openapi";
import { Configuration } from "../types/openapi";

export const UserAPI = new UsersApi(undefined, "", axios);
