import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { UserAPI } from "../../../api/User";

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const res = UserAPI.meGet()
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      navigate("/login");
    });
  return (
    <Flex minH="100px" display="flex" justify="center" align="center">
      <Form />
    </Flex>
  );
};

export default FormPage;
