import React from 'react';
import { Box, 
        Button, 
        HStack, 
        IconButton, 
        Image, 
        Input, 
        Modal, 
        ModalBody, 
        ModalCloseButton, 
        ModalContent, 
        ModalFooter, 
        ModalHeader, 
        ModalOverlay, 
        useColorModeValue, 
        useDisclosure, 
        VStack} from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import useProductStore from '../store/product';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';



const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);


  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteProduct = async (pid) => {
    const {success, message} = await deleteProduct(pid);
    if (success) {
      toast({
        title: "Product deleted",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error deleting product",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct);
    if (success) {
      toast({
        title: "Product updated",
        description: "Product Updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error updating product",
        description: "Product Update failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}>
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>${product.price}</Text>

            <HStack>
               <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
               <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
                                type='url'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>
                    <ModalFooter>
                        <HStack>
                            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </HStack>
                    </ModalFooter>

            </ModalContent>
        </Modal>
    </Box>
  );
};

export default ProductCard;