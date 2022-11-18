import React from "react";
import { Box, Button, Flex, Icon, Spinner } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDandelionAPI } from "../../../api/Dandelion";
import Detail from "../components/Detail";
import { ListCardProps } from "../../list/components/ListCard";

const DetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dandelionQuery = useDandelionAPI(params.dandelionId!);

  if (dandelionQuery.isLoading) {
    return <Spinner />;
  }

  if (!dandelionQuery?.data) {
    return <p>error</p>;
  }

  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <Box maxW="300px" m="30px">
        <Detail
          id={dandelionQuery.data.data.id!}
          image={dandelionQuery.data.data.image!}
          isNative={dandelionQuery.data.data.is_native!}
          statement={dandelionQuery.data.data.statement!}
          landmark={dandelionQuery.data.data.landmark!}
          placeType={dandelionQuery.data.data.type!}
          impression={dandelionQuery.data.data.impression!}
        />
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
