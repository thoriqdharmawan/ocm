import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiApp } from "../apiApp";
import { CustomersDraftType, CustomersType } from "../../models/customers";

type Response = {
  data: CustomersType;
};

type Payload = {
  body: CustomersDraftType;
  id: number;
};

type ErrorResponse = AxiosError<{
  message: string;
  errors: {
    [key: string]: string[];
  };
}>;

const useUpdateCustomer = (
  props?: UseMutationOptions<Response, ErrorResponse, Payload>
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiApp.put(
        // Fake api endpoint
        `/api/customer/${payload.id}`,
        payload.body
      );
      return response.data;
    },
    mutationKey: ["update-customer"],
    ...props,
  });
};

export default useUpdateCustomer;
