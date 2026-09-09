/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import React from "react";

interface ReuseTableProps<T> {
  loading?: boolean;
  columns: any;
  data: T[];
  setPage?: (page: any) => void;
  total?: any;
  limit?: any;
  page?: any;
  onChange?: (
    pagination: any,
    filters: Record<string, any>,
    sorter: any
  ) => void;
  keyValue: string | ((record: T) => string);
  draggable?: boolean;
  onDragEnd?: (newData: T[]) => void;
}

const ReuseTable: React.FC<ReuseTableProps<any>> = ({
  loading,
  columns,
  data,
  setPage,
  total,
  limit,
  page,
  onChange,
  keyValue,
  draggable = false,
  onDragEnd,
}) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newData = [...data];
    const [removed] = newData.splice(draggedIndex, 1);
    newData.splice(dropIndex, 0, removed);

    setDraggedIndex(null);

    if (onDragEnd) {
      onDragEnd(newData);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={
        total > 0
          ? {
            current: page,
            onChange: (page) => {
              if (setPage) {
                setPage(page);
              }
            },
            showSizeChanger: false,
            total,
            pageSize: limit,
          }
          : false
      }
      scroll={{ x: "max-content" }}
      rowKey={keyValue}
      onRow={(_record, index) => ({
        draggable: draggable,
        onDragStart: () => handleDragStart(index!),
        onDragOver: handleDragOver,
        onDrop: () => handleDrop(index!),
        onDragEnd: handleDragEnd,
        style: {
          cursor: draggable ? "move" : "default",
          opacity: draggedIndex === index ? 0.5 : 1,
        },
      })}
    />
  );
};

export default ReuseTable;