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
import { ListCardProps } from "../../list/components/ListCard";

const Detail = //() => {
  (props: ListCardProps) => {
    const { id, image, isNative, statement, landmark, placeType, impression } =
      props;
    const navigate = useNavigate();

    return (
      <Flex
        minH="100px"
        display="flex"
        justify="center"
        align="center"
        pb="30px"
      >
        <VStack>
          <Heading
            fontSize="25px"
            pb="10px"
            w="full"
            textAlign="left"
            color="green.800"
          >
            {/* 万葉植物園 */}
            {landmark}
          </Heading>
          <Center>
            <Image
              src={`data:image/jpeg;base64,${image}`}
              // src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLFaJb9dWEpsk2AGBERjAjq_h6hu0mZwmmWRFpr3ayuwOGblQ5"
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
            {/* 外来種 */}
            {isNative}
          </Heading>
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
            {/* 総苞片が反り返っている */}
            {statement}
          </Text>
          <Heading
            fontSize="16px"
            py="5px"
            w="full"
            textAlign="left"
            color="green.800"
          >
            感想
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
            {/* 花が大きかった */}
            {impression}
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
            {/* 林 */}
            {placeType}
          </Text>
        </VStack>
      </Flex>
    );
  };

export default Detail;
