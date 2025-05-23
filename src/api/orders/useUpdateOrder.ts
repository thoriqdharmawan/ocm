import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiApp } from "../apiApp";
import { OrdersType } from "../../models/orders";

type Response = {
  data: OrdersType;
};

type Payload = {
  id: number;
  body: Partial<OrdersType>;
};

type ErrorResponse = AxiosError<{
  message: string;
  errors: {
    [key: string]: string[];
  };
}>;

const useUpdateOrder = (
  props?: UseMutationOptions<Response, ErrorResponse, Payload>
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiApp.put(
        `/api/order/${payload.id}`,
        payload.body
      );
      return response.data;
    },
    mutationKey: ["update-order"],
    ...props,
  });
};

export default useUpdateOrder;
