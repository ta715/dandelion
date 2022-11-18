import React from "react";
import { Box, Heading, Input, Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Form: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box maxW="300px" mx="20px">
      <Heading
        fontSize="18px"
        m="5px"
        pt="20px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        4. 調査者の情報
      </Heading>
      <Heading
        fontSize="14px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        4-1. 名前
      </Heading>
      <Input h="25px" backgroundColor="white"></Input>
      <Heading
        fontSize="14px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        4-2. 住所
      </Heading>
      <Input h="25px" backgroundColor="white"></Input>
      <Heading
        fontSize="14px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        4-3. 電話番号
      </Heading>
      <Input h="25px" backgroundColor="white"></Input>
      <Heading
        fontSize="18px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        5. 感想
      </Heading>
      <Textarea backgroundColor="white"></Textarea>
    </Box>
  );
};

export default Form;
