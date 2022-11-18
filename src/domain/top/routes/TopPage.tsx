import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Top from "../componets/Top";

const TopPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <Box maxW="300px" m="30px">
        <Top />
        <Box maxW="300px">
          <Button
            h="43px"
            w="180px"
            mt="40px"
            mb="20px"
            backgroundColor="green.100"
            color="green.800"
            boxShadow="md"
            onClick={() => navigate("/list")}
          >
            タンポポをみる
          </Button>
          <Button
            h="43px"
            w="180px"
            m="20px"
            backgroundColor="green.100"
            color="green.800"
            boxShadow="md"
            onClick={() => navigate("/form")}
          >
            タンポポを登録する
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default TopPage;
