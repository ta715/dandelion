import { axios } from "../lib/axios";
import { UsersApi, DandelionsApi } from "../types/openapi/api";
import { Configuration } from "../types/openapi";
import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../lib/react-query";

export const DandelionAPI = new DandelionsApi(undefined, "", axios);

type GetDandelionQueryFnType = typeof DandelionAPI.dandelionsIdGet;

export const useDandelionAPI = (id: string) => {
  return useQuery<ExtractFnReturnType<GetDandelionQueryFnType>>({
    queryKey: ["dandelion"],
    queryFn: () => DandelionAPI.dandelionsIdGet(id),
  });
};

type ListDandelionQueryFnType = typeof DandelionAPI.dandelionsGet;

export const useDandelionsAPI = () => {
  return useQuery<ExtractFnReturnType<ListDandelionQueryFnType>>({
    queryKey: ["dandelions"],
    queryFn: () => DandelionAPI.dandelionsGet(),
  });
};
