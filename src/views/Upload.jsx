import React from "react";
import ImageLoader from "../components/ImageLoader";
import {
  SimpleGrid,
  Box,
  Input,
  FormLabel,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import useFirebaseService from "../utils/firebase";

const Upload = () => {
  const toast = useToast();
  const { storage, db, currentUser } = useFirebaseService();
  const [images, setImages] = React.useState([]);
  const [file, setFile] = React.useState({});
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "images"), (collection) => {
      const newImages = [];
      collection.forEach((doc) => {
        const data = doc.data();
        if (data.imageUrl) {
          newImages.push({imageUrl: data.imageUrl, email: data.email});
        }
      });
      setImages(newImages);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleUpload = () => {
    setIsUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(ref(storage, `images/${file.name}`)).then(async (url) => {
        await addDoc(collection(db, "images"), {
          imageUrl: url,
          email: currentUser.email,
        });
        setIsUploading(false);
        toast({
          title:"Successfully uploaded image",
          description: `image ${file.name} has been successfully uploaded`,
          status: "success"
        })
      }).catch(err => {
        toast({
          title: "Something went wrong",
          description: err.message,
          status: "error",
        })
      })
      setFile({})
    });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" mx="100px">
      <SimpleGrid columns={2} spacing={4}>
        {images.map((item, idx) => (
          <ImageLoader imageUrl={item.imageUrl} email={item.email} key={idx} />
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
