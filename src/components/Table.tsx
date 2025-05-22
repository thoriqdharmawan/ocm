import { ReactNode } from "react";
import { cn } from "../utils/classname";

export interface Column<T> {
  id: string;
  label: string;
  cell: ({ data }: { data: T }) => ReactNode | string | number;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[] | undefined;
  loading?: boolean;
}

const Table = <T,>({ columns, data, loading }: TableProps<T>) => {
  return (
    <div className="px-3 pb-2 shadow-sm bg-white rounded-3 table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            {columns?.map((column) => (
              <th key={column.id} className={cn("py-3 text-center", column.className)} scope="col">
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
                    <td key={`${key}-${idx}`}>
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
