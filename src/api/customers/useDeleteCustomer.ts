import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiApp } from "../apiApp";
import { CustomersType } from "../../models/customers";

type Response = {
  data: CustomersType;
};

type Payload = {
  id: number;
};

type ErrorResponse = AxiosError<{
  message: string;
  errors: {
    [key: string]: string[];
  };
}>;

const useDeleteCustomer = (
  props?: UseMutationOptions<Response, ErrorResponse, Payload>
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiApp.delete(
        // Fake api endpoint
        `/api/customer/${payload.id}`
      );
      return response.data;
    },
    mutationKey: ["delete-customer"],
    ...props,
  });
};

export default useDeleteCustomer;
