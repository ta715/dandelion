import React from "react";
import { Box, Image, Text, HStack, Center, Icon, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const ListCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center" pb="30px">
      <HStack>
        <Box w="200px" boxShadow="lg" background="white">
          <Center>
            <Image
              src="https://d2v9opmik2a3uk.cloudfront.net/uploads/2019/05/15161942/c2e9ddc2562db5960c1b449c4eec5351_1557937181.jpg"
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
            oo公園
          </Text>
          <Box onClick={() => navigate("/detail")}>
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
