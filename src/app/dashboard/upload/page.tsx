"use client";

import { useState, useRef } from "react";
import { uploadFile } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function UploadPage() {
  const [enabled, setEnabled] = useState(true);
  const [allowUnknown, setAllowUnknown] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("enabled", String(enabled));
    formData.set("allowUnknown", String(allowUnknown));
    await uploadFile(formData);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
      setSelectedFile(file);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (["mp4", "mov", "avi", "mkv"].includes(ext ?? "")) return { label: "VID", color: "text-accent", bg: "bg-accent/10" };
    if (["pdf"].includes(ext ?? "")) return { label: "PDF", color: "text-destructive", bg: "bg-destructive/10" };
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext ?? "")) return { label: "IMG", color: "text-chart-3", bg: "bg-chart-3/10" };
    if (["zip", "rar", "tar", "gz"].includes(ext ?? "")) return { label: "ZIP", color: "text-chart-4", bg: "bg-chart-4/10" };
    return { label: (ext?.toUpperCase() ?? "FILE").slice(0, 3), color: "text-primary", bg: "bg-primary/10" };
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-accent/6 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Dashboard / Upload</p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground leading-tight">Upload a file</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`rounded-xl border-2 border-dashed cursor-pointer transition-all p-8 flex flex-col items-center gap-3 text-center ${
              dragOver
                ? "border-primary bg-primary/8 scale-[1.01]"
                : selectedFile
                ? "border-accent/40 bg-accent/5"
                : "border-border hover:border-primary/40 hover:bg-muted/30 bg-card/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              required
              className="hidden"
              onChange={handleFileChange}
            />

            {selectedFile ? (
              <>
                <div className={`w-12 h-12 rounded-xl ${getFileIcon(selectedFile.name).bg} ${getFileIcon(selectedFile.name).color} flex items-center justify-center text-xs font-bold`}>
                  {getFileIcon(selectedFile.name).label}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground truncate max-w-xs">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatSize(selectedFile.size)}</p>
                </div>
                <span className="text-xs text-primary underline underline-offset-2">Change file</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 4V14M11 4L7.5 7.5M11 4L14.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
                    <path d="M4 18H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="text-muted-foreground" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drop your file here or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">All file types supported · Up to 5GB</p>
                </div>
              </>
            )}
          </div>

          {/* Fields card */}
          <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Display Name
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="e.g. Project Brief Q4"
                required
                className="rounded-lg h-10 text-sm"
              />
              <p className="text-[11px] text-muted-foreground">This is what recipients will see</p>
            </div>

            <div className="h-px bg-border" />

            {/* Two columns: max downloads + expires */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Max Downloads
                </Label>
                <Input
                  type="number"
                  name="maxDownloads"
                  defaultValue={10}
                  min={1}
                  required
                  className="rounded-lg h-10 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Expires At
                </Label>
                <Input
                  type="datetime-local"
                  name="expiresAt"
                  required
                  className="rounded-lg h-10 text-sm"
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Toggles */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Enable link</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Allow recipients to download this file</p>
                </div>
                <Switch checked={enabled} onCheckedChange={setEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Allow unknown users</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Let anyone with the link download</p>
                </div>
                <Switch checked={allowUnknown} onCheckedChange={setAllowUnknown} />
              </div>
            </div>
          </div>

          {/* Summary strip */}
          <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${enabled ? "bg-accent" : "bg-muted-foreground"}`} />
              <span>{enabled ? "Link active" : "Link disabled"}</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1C3.01 1 1 3.01 1 5.5S3.01 10 5.5 10 10 7.99 10 5.5 7.99 1 5.5 1Z" stroke="currentColor" strokeWidth="1.1" />
                <path d="M5.5 3V5.5L7 6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span>{allowUnknown ? "Open to anyone" : "Authenticated only"}</span>
            </div>
            {selectedFile && (
              <>
                <div className="w-px h-3 bg-border" />
                <span>{formatSize(selectedFile.size)}</span>
              </>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl font-semibold gap-2 shadow-sm shadow-primary/20"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
                  <path d="M13.5 7.5C13.5 4.19 10.81 1.5 7.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Uploading…
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 2V10M7.5 2L4.5 5M7.5 2L10.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Upload File
              </>
            )}
          </Button>

        </form>
      </div>
    </div>
  );
}