CREATE TABLE "file" (
	"name" text PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	"downloads" integer DEFAULT 0,
	"max_downloads" integer DEFAULT 10,
	"expires_at" timestamp with time zone NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "file_link_unique" UNIQUE("link")
);
--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;