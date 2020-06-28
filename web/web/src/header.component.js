import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/core';

function Header ({
    isUploading = false, 
    onPhotoSelect,
}) {
    return (
        <Flex 
            px="4"
            py="4"
            justify="space-between"
        >
            <Text 
                as="div"
                fontSize="xl" 
                fontWeight="bold" 
            >
                <span 
                    role="img" 
                    aria-labelledby="potato"
                >
                    🥔 
                </span> 
                <span 
                    role="img" 
                    aria-labelledby="potato"
                >
                    🍠 
                </span> 
                Photato
            </Text>

            <Flex align="end">
                <Button 
                    size="sm"
                    variant="outline"
                    variantColor="blue"
                    isLoading={isUploading}
                    loadingText="Uploading..."
                >
                    Upload Photo     
                </Button>
            </Flex>
        </Flex>
    );
};

export default Header;

