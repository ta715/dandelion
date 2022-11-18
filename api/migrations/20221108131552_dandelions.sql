-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS dandelions (
    id varchar(36) NOT NULL,
    image      longblob  NOT NULL,
    statement  varchar(250) NOT NULL,
    lat        float NOT NULL,
    lng        float NOT NULL,
    landmark   varchar(50) NOT NULL,
    type       varchar(50) NOT NULL,
    is_native   boolean NOT NULL,
    user_id     varchar(36) NOT NULL,
    impression varchar(250) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
    );
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS dandelions;
-- +goose StatementEnd
