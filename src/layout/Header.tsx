import React from "react";
import { Outlet } from "react-router-dom";
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Flex
        justifyContent="space-between"
        h="80px"
        w="full"
        mx="auto"
        backgroundColor="yellow.200"
      >
        <Link href="/">
          <Heading fontSize="25px" mt="25px" ml="10px" color="green.800">
            タンポポ調査
          </Heading>
        </Link>
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              color="green.800"
              backgroundColor="yellow.200"
              boxSize="70px"
              fontSize="40px"
            ></MenuButton>
            <MenuList fontWeight="bold" color="secondary">
              <MenuItem onClick={() => navigate("/")}>TOP</MenuItem>
              <MenuItem onClick={() => navigate("/list")}>
                タンポポ一覧
              </MenuItem>
              <MenuItem onClick={() => navigate("/form")}>
                タンポポ登録
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Box flex="1" py="2rem" backgroundColor="yellow.50" h="full">
        <Outlet />
      </Box>
    </div>
  );
};

export default Header;
