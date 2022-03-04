import {Flex, Box} from "@chakra-ui/react";

const ImageLoader = ({imageUrl}) => {
    const basicBoxStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxSize: '250px',
      color: 'white',
      textShadow: '0 0 20px black',
      fontWeight: 'bold',
      fontSize: '20px',
      transition:'filter .3s ease-in',
      px: 4,
     }
    return (
      <Flex
        flexWrap='wrap'
        spacing='24px'
        gap='16px'
        justifyContent='space-evenly'
      >
        {/* adding filter property to the element */}
        <Box sx={basicBoxStyles} filter='grayscale(80%)'
            backgroundPosition='center'
            backgroundSize='cover'
            backgroundRepeat='no-repeat'
            backgroundImage={`url(${imageUrl})`}
            borderRadius="md"
            _hover={{
                filter: 'grayscale(0%)'
            }}
        >
          Box with Filter
        </Box>
      </Flex>
    )
  }

  export default ImageLoader