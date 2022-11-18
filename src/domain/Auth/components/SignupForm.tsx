import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../../api/User";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    const res = UserAPI.authSignupPost(
      lastName,
      firstName,
      address,
      phoneNumber,
      email,
      password
    )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box py="30px">
      <HStack>
        <FormControl>
          <FormLabel color="green.800">姓</FormLabel>
          <Input
            htmlSize={35}
            width="90%"
            type="last_name"
            placeholder="姓を入力してください"
            onChange={handleChangeLastName}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="green.800">名</FormLabel>
          <Input
            htmlSize={35}
            width="90%"
            type="first_name"
            placeholder="名を入力してください"
            onChange={handleChangeFirstName}
          />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel color="green.800">住所</FormLabel>
        <Input
          htmlSize={35}
          width="90%"
          type="address"
          placeholder="住所を入力してください"
          onChange={handleChangeAddress}
        />
      </FormControl>
      <FormControl>
        <FormLabel color="green.800">電話番号</FormLabel>
        <Input
          htmlSize={35}
          width="90%"
          type="phone_number"
          placeholder="電話番号を入力してください"
          onChange={handleChangePhoneNumber}
        />
      </FormControl>
      <FormControl>
        <FormLabel color="green.800">メールアドレス</FormLabel>
        <Input
          htmlSize={35}
          width="90%"
          type="email"
          placeholder="メールアドレスを入力してください"
          onChange={handleChangeEmail}
        />
      </FormControl>
      <FormControl>
        <FormLabel color="green.800">パスワード</FormLabel>
        <Input
          htmlSize={35}
          width="90%"
          type="password"
          placeholder="パスワードを入力してください"
          onChange={handleChangePassword}
        />
      </FormControl>
      <Button
        my="30px"
        backgroundColor="green.100"
        color="green.800"
        onClick={handleSignup}
      >
        登録
      </Button>
    </Box>
  );
};

export default Signup;
