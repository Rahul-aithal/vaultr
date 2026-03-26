"use client";
import { ColumnDef } from "@tanstack/react-table";

type Download = {
  name: string;
  fileLink: string;
  downloadedAt: Date;
  status: string|null;
};

export const downloadColumns: ColumnDef<Download>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "fileLink",
    header: "Link",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "downloadedAt",
    header: "Downloaded At",
    cell: ({ row }) => new Date(row.getValue("downloadedAt")).toLocaleString(),
  },
];