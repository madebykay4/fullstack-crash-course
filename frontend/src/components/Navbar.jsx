import { Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HStack, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useColorMode } from "@chakra-ui/react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={'1140px'} p={4} color="white">
      <Flex 
        height={16}
        justifyContent="space-between" 
        alignItems="center"
        flexDir={{ 
          base: "column", 
          sm: "row" }}>
        <Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>
        <HStack spacing={2} alignItems="center">
          <Link to={"/create"}>
            <Button>
             <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar