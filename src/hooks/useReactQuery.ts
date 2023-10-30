/* eslint-disable no-restricted-globals */
import axios from "axios";

import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useQueryFetchGet = (
  fetchUrl: string,
  queryKey: any[],
  enableFetch?: boolean,
  token?: string,
  setFn?: Dispatch<SetStateAction<any>>,
  refetchInterval?: number,
  refetchOnWindowFocus?: boolean,
  cacheTime?: number,
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void
) => {
  const { status, data, isFetching, refetch, isError } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const data = await axios.get(fetchUrl);
      const json = data.data;
      return json;
    },
    onSuccess: onSuccess
      ? onSuccess
      : (data: any) => {
          // If status if success then assgin the datasource
          if (data?.status === "FAILURE") {
            console.log("Fail to load data.");
          } else if (data?.status === "SUCCESS") {
            console.log("Success", data);
            if (_.isArray(data?.data)) {
              if (setFn) setFn(data?.data);
            }
          }
        },
    onError: onError
      ? onError
      : (error: any) => {
          alert("There was a error to fetch the data.");
        },
    refetchInterval: refetchInterval ? refetchInterval : 300000,
    refetchOnWindowFocus: refetchOnWindowFocus ? refetchOnWindowFocus : false,
    cacheTime: cacheTime ? cacheTime : 5000,
    enabled: enableFetch ? enableFetch : true,
  });

  return { status, data, isFetching, isError, refetch };
};

export const useQueryFetchPost = (
  fetchUrl: string,
  queryKey: any[],
  setFn?: Dispatch<SetStateAction<any>>,
  useRoute?: boolean,
  enableFetch?: boolean,
  refetchInterval?: number,
  refetchOnWindowFocus?: boolean,
  cacheTime?: number,
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void
) => {
  const { status, data, isFetching, refetch, isError } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const data = await axios.post(fetchUrl, _);
      const json = data.data;
      return json;
    },
    onSuccess: onSuccess
      ? onSuccess
      : (data: any) => {
          // If status if success then assgin the datasource
          if (data?.status === "Fail") {
            alert("Request fail. Please try again.");
          } else if (data?.status === "Success") {
            alert("Request is Successful.");
            if (_.isArray(data?.data)) {
              if (setFn) setFn(data?.data);
            }
          }
        },
    onError: onError
      ? onError
      : (error: any) => {
          alert("There was a error to fetch the data.");
        },
    refetchInterval: refetchInterval ? refetchInterval : 300000,
    refetchOnWindowFocus: refetchOnWindowFocus ? refetchOnWindowFocus : false,
    cacheTime: cacheTime ? cacheTime : 5000,
    enabled: enableFetch ? enableFetch : false,
  });

  return { status, data, isFetching, isError, refetch };
};

export const useQueryPostMutation = (
  fetchUrl: string,
  queryKey: any[],
  refetch?: () => void,
  useRoute?: boolean,
  onSuccessFunction?: any,
  onErrorFunction?: any
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const addParam = async (addingParam?: any) => {
    return await axios.post(fetchUrl as string, addingParam);
  };

  return useMutation({
    mutationFn: addParam,
    onSuccess: onSuccessFunction
      ? onSuccessFunction
      : (data: any) => {
          console.log("Sucess", data);
          // If status if success then assgin the datasource
          if (data?.data?.status === "Fail") {
            alert("Request fail. Please try again.");
            return;
          } else if (data?.data?.status === "Success") {
            alert("Request is Successful.");
            if (useRoute) router.push(`/posts/${data?.data?.data?.post?.slug}`);
            if (refetch) refetch();
          }
          queryClient.invalidateQueries({ queryKey });
        },
    onError: onErrorFunction
      ? onErrorFunction
      : () => {
          alert("There was a error to fetch the data.");
        },
  });
};

export const useQueryPutMutation = (
  fetchUrl: string,
  queryKey: any[],
  refetch?: () => void,
  onSuccessFunction?: any,
  onErrorFunction?: any
) => {
  const queryClient = useQueryClient();

  const addParam = async (addingParam?: any) => {
    return await axios.post(fetchUrl as string, addingParam);
  };

  return useMutation({
    mutationFn: addParam,
    onSuccess: onSuccessFunction
      ? onSuccessFunction
      : (data: any) => {
          console.log("Sucess", data);
          // If status if success then assgin the datasource
          if (data?.data?.status === "Fail") {
            console.log("Fail to load data.");
            return;
          } else if (data?.data?.status === "Success") {
            if (refetch) refetch();
          }
          queryClient.invalidateQueries({ queryKey });
        },
    onError: onErrorFunction
      ? onErrorFunction
      : () => {
          alert("There was a error to fetch the data.");
        },
  });
};

export const useQueryDeleteMutation = (
  fetchUrl: string,
  queryKey: any[],
  refetch?: () => void,
  useRoute?: boolean,
  onSuccessFunction?: any,
  onErrorFunction?: any,
  addingParam?: any
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const addParam = async (addingParam?: any) => {
    return await axios.delete(fetchUrl as string, addingParam);
  };

  return useMutation({
    mutationFn: addParam,
    onSuccess: onSuccessFunction
      ? onSuccessFunction
      : (data: any) => {
          // If status if success then assgin the datasource
          if (data?.data?.status === "Fail") {
            alert("Request fail. Please try again.");
            return;
          } else if (data?.data?.status === "Success") {
            alert("Request is Successful.");
            if (useRoute) router.push(`/`);
            if (refetch) refetch();
          }
          queryClient.invalidateQueries({ queryKey });
        },
    onError: onErrorFunction
      ? onErrorFunction
      : (error: any, query) => {
          if (error?.request?.status === 401) {
            alert(error?.response?.data?.message);
          }
        },
  });
};
