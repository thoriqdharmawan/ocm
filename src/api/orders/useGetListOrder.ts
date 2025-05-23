import { useQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import type { AxiosError } from "axios";
import { ApiResponseInterface, MetaType } from "../../models/global";
import { OrdersType } from "../../models/orders";
import { useState } from "react";

type Props = {
  params?: {
    offset?: number;
    limit?: number;
  };
};

const useGetListOrder = (props?: Props) => {
  const [meta, setMeta] = useState<MetaType>();

  const queryFn = async () => {
    try {
      const response = await apiApp.get<ApiResponseInterface<OrdersType[]>>(
        "/api/order",
        {
          params: {
            limit: props?.params?.limit || 10,
            offset: props?.params?.offset || 0,
          },
        }
      );
      setMeta(response.data.meta);
      return response.data.data;
    } catch (error: unknown) {
      const e = error as AxiosError<ApiResponseInterface<null>>;
      throw new Error(e?.response?.data?.message);
    }
  };

  const query = useQuery({
    queryKey: ["list-order", props?.params],
    queryFn,
  });

  return { ...query, meta };
};

export default useGetListOrder;
