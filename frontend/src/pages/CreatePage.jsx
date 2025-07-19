import { Container, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import useProductStore from "../store/product";
import { useToast } from '@chakra-ui/react'



const CreatePage = () => {
  const  [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const toast = useToast();
  // console.log("newProduct:", newProduct);
  const {createProduct}=useProductStore();

  const handleAddProduct = async() => {
    const {success,message} = await createProduct(newProduct);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" }); // Reset form
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} 
        p={6} rounded={"lg"} shadow={"md"}>

          <VStack spacing={4}>
            <Input  
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme="blue" w="full" onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage;