import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { file } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ id: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const record = await db
    .select({ name: file.name, id: file.id })
    .from(file)
    .where(eq(file.id, id))
    .then((r) => r[0]);

  if (!record) return <div>File not found.</div>;

  const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL}/download/${record.id}`;

  return (
    <div className="container max-w-lg mx-auto py-10 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Upload Successful 🎉</h1>
      <p className="text-muted-foreground">Your file <strong>{record.name}</strong> is ready to share.</p>

      <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
        <p className="text-sm truncate flex-1">{downloadLink}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(downloadLink)}
        >
          Copy
        </Button>
      </div>

      <Link href="/dashboard">
        <Button variant="secondary" className="w-full">Back to Dashboard</Button>
      </Link>
    </div>
  );
}