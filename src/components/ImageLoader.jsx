import { Flex, AspectRatio, Image, Text } from "@chakra-ui/react";

const ImageLoader = ({ imageUrl,email }) => {
  const basicBoxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxSize: "250px",
    color: "white",
    textShadow: "0 0 20px black",
    fontWeight: "bold",
    fontSize: "20px",
    transition: "filter .3s ease-in",
    px: 4,
  };
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-evenly"
    >
      {/* adding filter property to the element */}
      <AspectRatio maxW='400px' ratio={16/9} sx={basicBoxStyles}
        filter="grayscale(80%)"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundImage={`url(${imageUrl})`}
        borderRadius="md"
        _hover={{
          filter: "grayscale(0%)",
        }}
      >
        <Image src={imageUrl} objectFit="cover" />
      </AspectRatio>
      <Text>{email}</Text>
    </Flex>
  );
};

export default ImageLoader;
