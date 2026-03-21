"use client"

import { Button } from "@/components/ui/button";
import { file } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


type fileT = typeof file.$inferSelect;
type fileC = Pick<fileT,"downloads"|"enabled"|"link"|"maxDownloads"|"name">
export const columns: ColumnDef<fileC>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "link",
    header: "Link",
  },
  {
    accessorKey: "downloads",
    header: ({ column }) => {
         return (
           <Button
             variant="ghost"
             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
           >
             Downloads
             <ArrowUpDown className="ml-2 h-4 w-4" />
           </Button>
         )
       },
  },
  {
    accessorKey: "maxDownloads",
    header: "Max Downloads",
  },
  {
    accessorKey: "enabled",
    header: "Enabled",
  },
];
