import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiApp } from "../apiApp";
import { OrdersType } from "../../models/orders";

type Response = {
  data: OrdersType;
};

type Payload = {
  body: Partial<OrdersType>;
};

type ErrorResponse = AxiosError<{
  message: string;
  errors: {
    [key: string]: string[];
  };
}>;

const useAddOrder = (
  props?: UseMutationOptions<Response, ErrorResponse, Payload>
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiApp.post(
        "/api/order",
        payload.body
      );
      return response.data;
    },
    mutationKey: ["add-order"],
    ...props,
  });
};

export default useAddOrder;
