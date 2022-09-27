import React from "react";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Confirmation from "../componets/Confirmation";

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <Box maxW="300px" m="30px">
        <Confirmation />
        <Box maxW="300px">
          <Button
            h="43px"
            w="180px"
            mt="20px"
            mb="20px"
            backgroundColor="green.100"
            color="green.800"
            boxShadow="md"
            onClick={() => navigate("/list")}
          >
            登録
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ConfirmationPage;
