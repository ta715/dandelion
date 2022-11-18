import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Form2 from "../componets/Form2";

const FormPage2: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <Box maxW="300px" m="5px">
        <Form2 />
        <Box maxW="300px">
          <Button
            h="43px"
            w="180px"
            mt="50px"
            mb="20px"
            backgroundColor="green.100"
            color="green.800"
            boxShadow="md"
            onClick={() => navigate("/confirmation")}
          >
            確認画面へ
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default FormPage2;
