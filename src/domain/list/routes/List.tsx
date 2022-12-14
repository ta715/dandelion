import React from "react";
import { VStack, Heading, Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ListCard from "../components/ListCard";
import { useDandelionsAPI } from "../../../api/Dandelion";

const List: React.FC = () => {
  const navigate = useNavigate();
  const dandelionsQuery = useDandelionsAPI();

  if (dandelionsQuery.isLoading) {
    return <Spinner />;
  }

  if (!dandelionsQuery?.data) {
    return <p>error</p>;
  }

  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <VStack>
        <Heading fontSize="25px" textAlign="left" color="green.800" my="20px">
          みんなのタンポポ情報
        </Heading>
        {dandelionsQuery.data.data.map((dandelion, index) => (
          <ListCard
            id={dandelion.id!}
            image={dandelion.image!}
            isNative={dandelion.is_native!}
            statement={dandelion.statement!}
            landmark={dandelion.landmark!}
            placeType={dandelion.type!}
            impression={dandelion.impression!}
          />
        ))}
      </VStack>
    </Flex>
  );
};

export default List;
