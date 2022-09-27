import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Image,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Detail: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center" pb="30px">
      <VStack>
        <Heading
          fontSize="25px"
          pb="10px"
          w="full"
          textAlign="left"
          color="green.800"
        >
          oo公園
        </Heading>
        <Center>
          <Image
            src="https://d2v9opmik2a3uk.cloudfront.net/uploads/2019/05/15161942/c2e9ddc2562db5960c1b449c4eec5351_1557937181.jpg"
            boxSize="200px"
            objectFit="cover"
            mt="20px"
            pb="40px"
          />
        </Center>
        <Heading
          fontSize="16px"
          py="5px"
          w="full"
          textAlign="left"
          color="green.800"
        >
          特徴
        </Heading>
        <Text
          fontSize="14px"
          mx="15px"
          mb="20px"
          pb="30px"
          w="230px"
          textAlign="left"
          color="green.800"
        >
          あれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれあれこれそれ
        </Text>
        <Heading
          fontSize="16px"
          py="5px"
          w="full"
          textAlign="left"
          color="green.800"
        >
          咲いていた場所
        </Heading>
        <Text
          fontSize="14px"
          mx="15px"
          mb="20px"
          w="230px"
          textAlign="left"
          color="green.800"
        >
          池の土手
        </Text>
        <Text
          fontSize="14px"
          mx="15px"
          w="230px"
          textAlign="left"
          color="green.800"
        >
          xx県xx市xxxxx
        </Text>
      </VStack>
    </Flex>
  );
};

export default Detail;
