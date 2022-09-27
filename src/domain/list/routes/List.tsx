import React from "react";
import { VStack, Heading, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ListCard from "../componets/ListCard";

const List: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <VStack>
        <Heading fontSize="25px" textAlign="left" color="green.800" mb="20px">
          みんなのタンポポ情報
        </Heading>
        <ListCard />
        <ListCard />
        <ListCard />
      </VStack>
    </Flex>
  );
};

export default List;
