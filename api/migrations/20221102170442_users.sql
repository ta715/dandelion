-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS users (
id varchar(36) NOT NULL,
last_name varchar(50) NOT NULL,
first_name varchar(50) NOT NULL,
address varchar(250) NOT NULL,
phone_number varchar(50) NOT NULL,
email varchar(50) NOT NULL,
password varchar(100) NOT NULL,
PRIMARY KEY(id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS users;
-- +goose StatementEnd
