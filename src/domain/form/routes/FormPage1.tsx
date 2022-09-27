import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Form1 from "../componets/Form1";

const FormPage1: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <Box maxW="300px" m="5px">
        <Form1 />
        <Box maxW="300px">
          <Button
            h="43px"
            w="180px"
            mt="20px"
            mb="20px"
            backgroundColor="green.100"
            color="green.800"
            boxShadow="md"
            onClick={() => navigate("/form2")}
          >
            次へ
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default FormPage1;
