import { ReactNode } from "react";

export interface Column<T> {
  id: string;
  label: string;
  cell: ({ data }: { data: T }) => ReactNode | string | number;
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
              <th key={column.id} className="py-3" scope="col">
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
