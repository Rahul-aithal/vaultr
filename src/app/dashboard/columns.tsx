"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { file } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { EditFileDialog } from "./editFile";

type FileT = typeof file.$inferSelect;
export type FileC = Pick<FileT, "downloads" | "enabled" | "link" | "maxDownloads" | "name" | "allowUnkonwn"> & {
  expiresAt?: Date | null;
};

function EditCell({ row }: { row: { original: FileC } }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-7 px-2.5 rounded-lg text-xs text-muted-foreground hover:text-foreground gap-1.5"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
        Edit
      </Button>
      <EditFileDialog
        file={row.original}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export const columns: ColumnDef<FileC>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium text-foreground text-sm truncate max-w-[160px] block">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <a
        href={`/download/${row.getValue("link")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-primary underline underline-offset-2 hover:opacity-80 transition-opacity font-mono truncate max-w-[180px] block"
      >
        {row.getValue("link")}
      </a>
    ),
  },
  {
    accessorKey: "downloads",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-7 px-2 text-xs font-medium text-muted-foreground hover:text-foreground -ml-2"
      >
        Downloads
        <ArrowUpDown className="ml-1.5 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const downloads = row.getValue("downloads") as number ?? 0;
      const max = row.original.maxDownloads ?? 10;
      const pct = Math.min((downloads / Math.max(max, 1)) * 100, 100);
      return (
        <div className="flex items-center gap-2 min-w-[80px]">
          <div className="h-1.5 w-16 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {downloads}/{max}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "maxDownloads",
    header: "Max",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground tabular-nums">
        {row.getValue("maxDownloads") ?? 10}
      </span>
    ),
  },
  {
    accessorKey: "enabled",
    header: "Status",
    cell: ({ row }) => {
      const enabled = row.getValue("enabled") as boolean;
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
          enabled
            ? "bg-accent/10 text-accent"
            : "bg-muted text-muted-foreground"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${enabled ? "bg-accent" : "bg-muted-foreground"}`} />
          {enabled ? "Active" : "Disabled"}
        </span>
      );
    },
  },
  {
    accessorKey: "allowUnkonwn",
    header: "Access",
    cell: ({ row }) => {
      const allowed = row.getValue("allowUnkonwn") as boolean;
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
          allowed
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        }`}>
          {allowed ? "Public" : "Auth only"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <EditCell row={row} />,
  },
];
