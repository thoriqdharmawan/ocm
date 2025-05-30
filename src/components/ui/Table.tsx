import { CSSProperties, ReactNode } from "react";
import { cn } from "../../utils/classname";

export interface Column<T> {
  id: string;
  label: string;
  cell: ({ data }: { data: T }) => ReactNode | string | number;
  className?: string;
  style?: CSSProperties;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[] | undefined;
  loading?: boolean;
}

const Table = <T,>({ columns, data, loading }: TableProps<T>) => {
  return (
    <div className="px-3 pb-2 bg-white rounded-3 table-responsive custom-shadow mb-4">
      <table className="table align-middle">
        <thead>
          <tr>
            {columns?.map((column) => (
              <th
                key={column.id}
                className={cn("py-3 text-center", column.className)}
                style={column.style}
                scope="col"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loading &&
            data?.map((dataItem, key) => (
              <tr key={key}>
                {columns.map((col, idx) => {
                  return (
                    <td
                      key={`${key}-${idx}`}
                      className={cn("fw-light fs-6", col.className)}
                      style={col.style}
                    >
                      {col.cell({ data: dataItem })}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
