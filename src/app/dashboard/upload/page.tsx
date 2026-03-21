"use client";

import { useState } from "react";
import { uploadFile } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function UploadPage() {
  const [enabled, setEnabled] = useState(true);
  const [allowUnknown, setAllowUnknown] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("enabled", String(enabled));
    formData.set("allowUnknown", String(allowUnknown));
    await uploadFile(formData);
    setLoading(false);
  };

  return (
    <div className="container max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Upload File</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* File */}
        <div className="flex flex-col gap-2">
          <Label>File</Label>
          <Input type="file" name="file" required />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input type="text" name="name" placeholder="Original file name" required />
        </div>

        {/* Max Downloads */}
        <div className="flex flex-col gap-2">
          <Label>Max Downloads</Label>
          <Input type="number" name="maxDownloads" defaultValue={10} min={1} required />
        </div>

        {/* Expires At */}
        <div className="flex flex-col gap-2">
          <Label>Expires At</Label>
          <Input type="datetime-local" name="expiresAt" required />
        </div>

        {/* Enabled */}
        <div className="flex items-center justify-between">
          <Label>Enabled</Label>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>

        {/* Allow Unknown */}
        <div className="flex items-center justify-between">
          <Label>Allow Unknown Users</Label>
          <Switch checked={allowUnknown} onCheckedChange={setAllowUnknown} />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
}