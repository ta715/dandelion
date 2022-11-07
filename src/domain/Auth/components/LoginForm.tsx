import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../../api/User";

const Login: React.FC = () => {
  // ここから
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    const res = UserAPI.authLoginPost(email, password)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //ここまで

  return (
    <Box py="30px">
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
        onClick={handleLogin}
      >
        ログイン
      </Button>
    </Box>
  );
};

export default Login;
