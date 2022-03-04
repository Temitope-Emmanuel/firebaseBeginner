import React from "react";
import ImageLoader from "../components/ImageLoader";
import {
  SimpleGrid,
  Box,
  Input,
  FormLabel,
  Text,
  Button,
} from "@chakra-ui/react";
import {DownloadIcon} from "@chakra-ui/icons";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import useFirebaseService from "../utils/firebase";

const Upload = () => {
    const {storage} = useFirebaseService();
    const [url, setUrl] = React.useState('')
  const [file, setFile] = React.useState({});
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    setIsUploading(true);
    const storageRef = ref(storage, file.name)
    uploadBytes(storageRef, file).then(snapshot => {
        getDownloadURL(ref(storage, file.name))
        .then(url => {
            setUrl(url)
        })
    })
  };

  return (
    <Box display="flex" flexDirection="column">
      <SimpleGrid columns={2} spacing={10}>
        {["https://picsum.photos/id/1080/200/300", url].map((item, idx) => (
          <ImageLoader imageUrl={item} key={idx} />
        ))}
      </SimpleGrid>
      <Box my="10">
        <FormLabel htmlFor="image-button">
          <Box
            backgroundColor="whitesmoke"
            borderRadius="full"
            width="40px"
            height="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="15"
            mx="auto"
            transition="transform .3s linear"
            _hover={{
              transform: "scale(1.75)",
            }}
          >
            <DownloadIcon
              transition="transform .3s linear"
              transform={file.name ? "rotate(180deg)" : "rotate(360deg)"}
            />
          </Box>
        </FormLabel>
        <Input
          accept="image/**"
          onChange={handleFileSelect}
          disabled={isUploading}
          type="file"
          display="none"
          id="image-button"
        />
      </Box>
      {file.name && (
        <Box
          mx="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text>{file.name}</Text>
          <Button isDisabled={isUploading} mt="10" onClick={handleUpload}>
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Upload;
