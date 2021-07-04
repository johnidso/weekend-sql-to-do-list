-- db name: weekend-to-do-app

CREATE TABLE "list" (
	"id" serial primary key,
	"item" varchar(180) not null,
	"is_done" boolean not null
);

-- added for feature-time-complete:

ALTER TABLE list ADD task_time TIMESTAMP;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.task_time = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON list
FOR ROW
EXECUTE PROCEDURE trigger_set_timestamp();