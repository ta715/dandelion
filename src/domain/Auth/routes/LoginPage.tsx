import React, { useEffect, useContext } from "react";
import { Flex, Box, Heading, VStack, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100vh" display="flex" justify="center" align="center">
      <Box p="10px">
        <VStack>
          <Heading fontSize="25px" py="5px">
            ログイン
          </Heading>
          <LoginForm />
          <Link color="blue.600" href="/signup">
            新規登録
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
