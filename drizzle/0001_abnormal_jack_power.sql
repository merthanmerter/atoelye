CREATE TABLE "newsletter" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "newsletter_email_unique" UNIQUE("email")
);
