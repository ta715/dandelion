import React, { useState, ChangeEvent } from "react";
import {
    Box,
    Heading,
    Textarea,
    Input,
    Radio,
    RadioGroup,
    Stack, Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DandelionAPI } from "../../../api/Dandelion";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [statement, setStatement] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [landmark, setLandmark] = useState("");
  const [type, setType] = useState("");
  const [impression, setImpression] = useState("");

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images && images[0]) {
      setImage(images[0]);
    }
  };
  const handleChangeStatement = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setStatement(e.target.value);
  };
  const handleChangeLandmark = (e: ChangeEvent<HTMLInputElement>) => {
    setLandmark(e.target.value);
  };
  const handleChangeType = (value: any) => {
    setType(value);
  };
  const handleChangeImpression = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setImpression(e.target.value);
  };
  const handleInput = () => {
      navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.longitude)
          const res = DandelionAPI.dandelionsPost(image!, statement, `${position.coords.latitude}`, `${position.coords.longitude}`, landmark, type, impression).then(() => {
              console.log("投稿完了")
              alert("データの投稿が完了しました")
              navigate("/")
          }).catch((e) => {
              console.log("error")
              alert(`ERROR: HTTP ERROR due to; ${e}`)
              navigate("/")
          })
      }, (error) => {
          alert("現在位置情報の取得ができません。環境設定を確認してください。")
      })
  };

  return (
      <>
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
              <Input type="file" border="none" onChange={handleChangeImage}></Input>
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
              <Textarea
                  backgroundColor="white"
                  onChange={handleChangeStatement}
              ></Textarea>
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
                  3-1. 目印
              </Heading>
              <Input
                  h="25px"
                  backgroundColor="white"
                  onChange={handleChangeLandmark}
              ></Input>
              <Heading
                  fontSize="14px"
                  m="5px"
                  py="10px"
                  w="full"
                  textAlign="left"
                  color="green.800"
              >
                  3-3. どんな場所
              </Heading>
              <RadioGroup onChange={handleChangeType}>
                  <Radio value="農地" pr="15px" size="sm">
                      農地
                  </Radio>
                  <Radio value="池の土手" pr="15px" size="sm">
                      池の土手
                  </Radio>
                  <Radio value="河川敷" size="sm">
                      河川敷
                  </Radio>
                  <Radio value="林" pr="15px" size="sm">
                      林
                  </Radio>
                  <Radio value="住宅街" pr="15px" size="sm">
                      住宅街
                  </Radio>
                  <Radio value="駐車場" pr="15px" size="sm">
                      駐車場
                  </Radio>
                  <Radio value="公園" pr="15px" size="sm">
                      公園
                  </Radio>
                  <Radio value="道端・分離帯" size="sm">
                      道端・分離帯
                  </Radio>
              </RadioGroup>
              <Heading
                  fontSize="18px"
                  m="5px"
                  py="10px"
                  w="full"
                  textAlign="left"
                  color="green.800"
              >
                  4. 感想
              </Heading>
              <Textarea
                  backgroundColor="white"
                  onChange={handleChangeImpression}
              ></Textarea>
          </Box>
          <Box maxW="300px">
              <Button
                  h="43px"
                  w="180px"
                  mt="20px"
                  mb="20px"
                  backgroundColor="green.100"
                  color="green.800"
                  boxShadow="md"
                  onClick={handleInput}
              >
                  確認画面へ
              </Button>
          </Box>
      </>
  );
};

export default Form;
