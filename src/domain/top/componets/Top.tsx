import React from "react";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Top: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box maxW="300px" m="20px">
      <HStack>
        <Box
          w="400px"
          boxShadow="lg"
          background="white"
          border="1px"
          borderRadius="md"
          borderColor="yellow.300"
        >
          <Heading
            fontSize="20px"
            m="5px"
            py="10px"
            w="full"
            textAlign="left"
            color="green.800"
          >
            タンポポ調査とは、、、
          </Heading>
          <Text fontSize="14px" mx="15px" mb="20px" py="5px" color="green.800">
            あれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれ
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default Top;
