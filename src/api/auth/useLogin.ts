import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiApp } from "../apiApp";
import { UserType } from "../../models/login";

type Response = {
  data: UserType;
};

type Payload = {
  body: {
    username: string;
    password: string;
  };
};

type ErrorResponse = AxiosError<{
  message: string;
  errors: {
    [key: string]: string[];
  };
}>;

const useLogin = (
  props?: UseMutationOptions<Response, ErrorResponse, Payload>
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiApp.post(
        // Fake api endpoint
        `/api/login`,
        payload.body
      );
      return response.data;
    },
    mutationKey: ["login"],
    ...props,
  });
};

export default useLogin;
