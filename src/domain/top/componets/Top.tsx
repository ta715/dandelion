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
            5年おきに継続されている市民参加型の調査である。この調査の主な目的は、身近なタンポポの分布を明らかにすること、環境との関係に注目してもらうこと、雑種について調査すること、自然に関心を持ってもらうこと、自然保護・環境保全の課題を共有することである。
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default Top;
