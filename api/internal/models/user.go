package models

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"log"
)

// User ユーザのエンティティ
type User struct {
	ID          string `db:"id"`
	LastName    string `db:"last_name"`
	FirstName   string `db:"first_name"`
	Address     string `db:"address"`
	PhoneNumber string `db:"phone_number"`
	Email       string `db:"email"`
	Password    string `db:"password"`
}

func (mh *ModelHandler) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	user := &User{}
	err := mh.db.GetContext(ctx, user, `
		SELECT id, last_name, first_name, address, phone_number, email, password FROM users WHERE email = ?`, email)

	if err == sql.ErrNoRows {
		log.Println("Data not found.")
		return nil, err
	}

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return user, nil
}

func (mh *ModelHandler) CreateUserByEmail(ctx context.Context, lastName string, firstName string, address string, phoneNumber string, email string, password string) (*User, error) {
	user := &User{
		ID:          "",
		LastName:    lastName,
		FirstName:   firstName,
		Address:     address,
		PhoneNumber: phoneNumber,
		Email:       email,
		Password:    "",
	}

	hashedPassword, err := HashPassword(password)
	if err != nil {
		return nil, err
	}

	id, err := uuid.NewUUID()
	if err != nil {
		id = uuid.New()
	}

	user.ID = id.String()
	user.Password = hashedPassword

	tx := mh.db.MustBeginTx(ctx, nil)
	_, err = mh.db.NamedExecContext(ctx, `
		INSERT INTO users (id, last_name, first_name, address, phone_number, email, password)
		VALUES (:id, :last_name, :first_name, :address, :phone_number, :email, :password)
	`, user)

	if err != nil {
		log.Println(err)
		tx.Rollback()
		return nil, err
	}
	if err = tx.Commit(); err != nil {
		return nil, err
	}
	return user, nil
}

func HashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return "", nil
	}
	return string(hashed), nil
}

func (u *User) IsPasswordVerified(password string) error {
	bytePassword := []byte(password)
	dbPassword := []byte(u.Password)
	err := bcrypt.CompareHashAndPassword(dbPassword, bytePassword)
	return err
}
