"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TaskInterface,
  TaskStatus,
  TaskType,
  LocationData,
} from "@/types/task";
import { data } from "./data";

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "available":
      return "bg-green-100 text-green-800";
    case "claimed":
      return "bg-blue-100 text-blue-800";
    case "in_progress":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTaskTypeLabel = (type: TaskType) => {
  switch (type) {
    case "cleanup":
      return "環境清理";
    case "rescue":
      return "緊急救援";
    case "supply_delivery":
      return "物資配送";
    case "medical_aid":
      return "醫療支援";
    case "shelter_support":
      return "收容支援";
    default:
      return type;
  }
};

const getPriorityColor = (level: number) => {
  if (level >= 4) return "text-red-600 font-bold";
  if (level >= 3) return "text-orange-600 font-semibold";
  return "text-green-600";
};

export const columns: ColumnDef<TaskInterface>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          任務標題
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium max-w-[200px] truncate">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "task_type",
    header: "任務類型",
    cell: ({ row }) => (
      <div className="capitalize">
        {getTaskTypeLabel(row.getValue("task_type"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "狀態",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus;
      return (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
        >
          {status === "pending" && "待審核"}
          {status === "available" && "可認領"}
          {status === "claimed" && "已認領"}
          {status === "in_progress" && "進行中"}
          {status === "completed" && "已完成"}
          {status === "cancelled" && "已取消"}
        </div>
      );
    },
  },
  {
    accessorKey: "priority_level",
    header: "優先級",
    cell: ({ row }) => {
      const level = row.getValue("priority_level") as number;
      return (
        <div className={`text-center ${getPriorityColor(level)}`}>
          {level}/5
        </div>
      );
    },
  },
  {
    accessorKey: "required_volunteers",
    header: () => <div className="text-center">需要人數</div>,
    cell: ({ row }) => {
      const required = row.getValue("required_volunteers") as number;
      const claimed = row.original.claimed_count;
      return (
        <div className="text-center">
          <div className="font-medium">
            {claimed}/{required}
          </div>
          <div className="text-xs text-gray-500">
            {Math.round((claimed / required) * 100)}%
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "location_data",
    header: "地點",
    cell: ({ row }) => {
      const location = row.getValue("location_data") as LocationData;
      return (
        <div className="max-w-[150px] truncate" title={location.address}>
          {location.address}
        </div>
      );
    },
  },
  {
    accessorKey: "creator_name",
    header: "建立者",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("creator_name") || "未知"}
      </div>
    ),
  },
  {
    accessorKey: "deadline",
    header: "截止時間",
    cell: ({ row }) => {
      const deadline = row.getValue("deadline") as string | null;
      if (!deadline) return <div className="text-gray-400">無</div>;

      const date = new Date(deadline);
      const now = new Date();
      const isOverdue = date < now;

      return (
        <div className={`text-sm ${isOverdue ? "text-red-600" : ""}`}>
          {date.toLocaleDateString("zh-TW")}
          <br />
          <span className="text-xs text-gray-500">
            {date.toLocaleTimeString("zh-TW", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              複製任務 ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>查看詳情</DropdownMenuItem>
            {task.can_claim && <DropdownMenuItem>認領任務</DropdownMenuItem>}
            {task.can_edit && <DropdownMenuItem>編輯任務</DropdownMenuItem>}
            {task.status === "in_progress" && (
              <DropdownMenuItem>更新進度</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export function TasksTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="搜尋任務標題..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="篩選地點..."
          value={
            (table.getColumn("location_data")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("location_data")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
