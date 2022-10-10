import React from "react";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Detail from "../componets/Detail";

const DetailPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <Box maxW="300px" m="30px">
        <Detail />
        <Box maxW="300px">
          <Button
            h="35px"
            w="150px"
            mt="40px"
            backgroundColor="green.100"
            color="green.800"
            boxShadow="md"
            float="left"
            fontSize="12px"
            onClick={() => navigate("/list")}
          >
            <Icon as={ChevronLeftIcon} float="right" fontSize="20px" />
            他のタンポポをみる
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default DetailPage;
