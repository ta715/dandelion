import { axios } from "../lib/axios";
import { UsersApi } from "../types/openapi/api";
import { Configuration } from "../types/openapi";

export const UserAPI = new UsersApi(undefined, "", axios);
