import { ReactNode } from "react";
import ThreeDotsIcon from "./ThreeDotsIcon";
import Dropdown from "../ui/Dropdown";

export interface CardActions {
  onClickDetail: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

interface CardItemProps extends CardActions {
  children: ReactNode;
}

const CardItem = (props: CardItemProps) => {
  const { children, onClickDetail, onClickEdit, onClickDelete } = props;

  return (
    <div className="bg-white d-flex flex-column custom-shadow rounded py-2 px-3">
      <div className="d-flex justify-content-end align-items-center mb-1">
        <Dropdown
          items={[
            {
              label: "Detail",
              action: onClickDetail,
            },
            {
              label: "Edit",
              action: onClickEdit,
            },
            {
              label: "Delete",
              action: onClickDelete,
            },
          ]}
          label={<ThreeDotsIcon />}
        />
      </div>
      {children}
    </div>
  );
};

export default CardItem;
