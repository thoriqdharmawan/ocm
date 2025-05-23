import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiApp } from "../apiApp";
import { OrdersType } from "../../models/orders";

type Response = {
  data: OrdersType;
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

const useDeleteOrder = (props?: any) => {
  return useMutation<Response, ErrorResponse, Payload>({
    mutationFn: async (payload) => {
      const response = await apiApp.delete(`/api/order/${payload.id}`);
      return response.data;
    },
    mutationKey: ["delete-order"],
    ...props,
  });
};

export default useDeleteOrder;
