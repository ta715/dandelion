import React from "react";
import {
  Box,
  Heading,
  Textarea,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Form1: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box maxW="300px" mx="20px">
      <Heading
        fontSize="18px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        1. 写真
      </Heading>
      {/* <Input type="image"></Input> */}
      <Heading
        fontSize="18px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        2. 特徴
      </Heading>
      <Textarea backgroundColor="white"></Textarea>
      <Heading
        fontSize="18px"
        m="5px"
        pt="20px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        3. 咲いていた場所
      </Heading>
      <Heading
        fontSize="14px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        3-1. 住所
      </Heading>
      <Input h="25px" backgroundColor="white"></Input>
      <Heading
        fontSize="14px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        3-2. 目印
      </Heading>
      <Input h="25px" backgroundColor="white"></Input>
      <Heading
        fontSize="14px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        3-3. 緯度・経度
      </Heading>
      <Heading
        fontSize="12px"
        m="5px"
        pt="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        北緯
      </Heading>
      <Input h="25px" backgroundColor="white"></Input>
      <Heading
        fontSize="12px"
        m="5px"
        pt="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        東経
      </Heading>
      <Input h="25px" backgroundColor="white"></Input>
      <Heading
        fontSize="14px"
        m="5px"
        py="10px"
        w="full"
        textAlign="left"
        color="green.800"
      >
        3-4. どんな場所
      </Heading>
      <RadioGroup>
        <Radio value="1" pr="15px" size="sm">
          農地
        </Radio>
        <Radio value="2" pr="15px" size="sm">
          池の土手
        </Radio>
        <Radio value="3" size="sm">
          河川敷
        </Radio>
        <Radio value="4" pr="15px" size="sm">
          林
        </Radio>
        <Radio value="5" pr="15px" size="sm">
          住宅街
        </Radio>
        <Radio value="6" pr="15px" size="sm">
          駐車場
        </Radio>
        <Radio value="8" pr="15px" size="sm">
          公園
        </Radio>
        <Radio value="7" size="sm">
          道端・分離帯
        </Radio>
      </RadioGroup>
    </Box>
  );
};

export default Form1;
