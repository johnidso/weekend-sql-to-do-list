CREATE TABLE "list" (
	"id" serial primary key,
	"item" varchar(180) not null,
	"is_done" boolean not null
);