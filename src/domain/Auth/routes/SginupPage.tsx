import React, { useContext, useEffect } from "react";
import { Flex, Box, Heading, Text, VStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignupForm";

const Signup: React.FC = () => {
  return (
    <Flex minH="100vh" display="flex" justify="center" align="center">
      <Box p="10px">
        <VStack>
          <Heading fontSize="25px" py="5px">
            新規登録
          </Heading>
          <SignUpForm />
          <Link color="blue.600" href="/login">
            ログイン
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Signup;
