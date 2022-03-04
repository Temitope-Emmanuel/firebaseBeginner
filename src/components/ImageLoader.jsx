import {Flex, Box} from "@chakra-ui/react";

const ImageLoader = () => {
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
      px: 4,
      background:
        'url(https://picsum.photos/id/1080/200/300) center/cover no-repeat',
    }
    return (
      <Flex
        flexWrap='wrap'
        spacing='24px'
        gap='16px'
        justifyContent='space-evenly'
      >
        {/* adding filter property to the element */}
        <Box sx={basicBoxStyles} filter='grayscale(80%)'>
          Box with Filter
        </Box>
        {/* adding blur property to the element */}
        <Box sx={basicBoxStyles} filter='auto' blur='2px' _ho>
          Box with Blur
        </Box>
      </Flex>
    )
  }

  export default ImageLoader