import React from "react";
import { Box, Image, Text, HStack, Center, Icon, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

export type ListCardProps = {
  id: string;
  image: number[];
  isNative: boolean;
  statement: string;
  landmark: string;
  placeType: string;
  impression: string;
};

const ListCard = //() => {
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
        onClick={() => navigate(`/detail/${id}`)}
        // onClick={() => navigate(`/detail/`)}
      >
        <HStack>
          <Box w="200px" boxShadow="lg" background="white">
            <Center>
              <Image
                src={`data:image/png;base64,${image}`}
                // src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLFaJb9dWEpsk2AGBERjAjq_h6hu0mZwmmWRFpr3ayuwOGblQ5"
                boxSize="150px"
                objectFit="cover"
                mt="20px"
              />
            </Center>
            <Text
              fontSize="16px"
              mx="15px"
              mt="10px"
              color="green.800"
              textAlign="left"
            >
              {/* 万葉植物園 */}
              {landmark}
            </Text>
            <Box>
              <HStack>
                <Text
                  fontSize="12px"
                  m="10px"
                  pl="55px"
                  color="green.800"
                  textAlign="right"
                >
                  詳しい情報を見る
                </Text>
                <Icon as={ChevronRightIcon} float="right" fontSize="20px" />
              </HStack>
            </Box>
          </Box>
        </HStack>
      </Flex>
    );
  };

export default ListCard;
