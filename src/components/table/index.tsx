import { Table } from "antd";
import type { TableProps } from "antd/es/table";
import React from "react";

interface IProps extends TableProps<any> {}

export const HvTable: React.FC<IProps> = (props: IProps) => {
  return (
    <Table
      showHeader
      // scroll={{  x: '100vw' }}
      tableLayout="fixed"
      className="cus-md:h-[55vh]"
      {...props}
    />
  );
};
