"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateFile, type EditFileInput } from "./actions";

type FileC = {
  name: string;
  link: string;
  downloads: number | null;
  maxDownloads: number | null;
  enabled: boolean | null;
  allowUnkonwn: boolean | null;
  expiresAt?: Date | null;
};

interface EditFileDialogProps {
  file: FileC;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditFileDialog({ file, open, onOpenChange }: EditFileDialogProps) {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(file.name);
  const [maxDownloads, setMaxDownloads] = useState(file.maxDownloads ?? 10);
  const [enabled, setEnabled] = useState(file.enabled ?? true);
  const [allowUnkonwn, setAllowUnkonwn] = useState(file.allowUnkonwn ?? true);
  const [expiresAt, setExpiresAt] = useState(
    file.expiresAt
      ? new Date(file.expiresAt).toISOString().slice(0, 16)
      : ""
  );

  const handleSave = () => {
    startTransition(async () => {
      try {
        const data: EditFileInput = {
          link: file.link,
          name,
          maxDownloads,
          expiresAt,
          enabled,
          allowUnkonwn,
        };
        await updateFile(file.link, data);
        toast.success("File updated successfully");
        onOpenChange(false);
      } catch {
        toast.error("Failed to update file");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 gap-0 overflow-hidden">

        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2H9L13 6V14H2V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" className="text-primary" />
                <path d="M9 2V6H13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" className="text-primary" />
                <path d="M5 9H9M5 11H8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="text-primary" />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-foreground leading-tight">
                Edit file
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono truncate max-w-[280px]">
                {file.link}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Display name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="File name"
              className="rounded-lg h-10 text-sm"
            />
          </div>

          {/* Max Downloads + Expires */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Max downloads
              </Label>
              <Input
                type="number"
                min={1}
                value={maxDownloads}
                onChange={(e) => setMaxDownloads(Number(e.target.value))}
                className="rounded-lg h-10 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Expires at
              </Label>
              <Input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="rounded-lg h-10 text-sm"
              />
            </div>
          </div>

          {/* Downloads progress */}
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Downloads used</span>
              <span className="text-xs font-semibold text-foreground">
                {file.downloads ?? 0} / {maxDownloads}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(((file.downloads ?? 0) / Math.max(maxDownloads, 1)) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Toggles */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Enable link</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Allow recipients to download this file
                </p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Allow unknown users</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Let anyone with the link download
                </p>
              </div>
              <Switch checked={allowUnkonwn} onCheckedChange={setAllowUnkonwn} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-border flex flex-row gap-2 sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="rounded-full flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="rounded-full flex-1 gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
                  <path d="M11.5 6.5C11.5 3.74 9.26 1.5 6.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 7L5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
