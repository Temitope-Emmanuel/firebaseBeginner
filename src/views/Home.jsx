import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  Text,
  Button,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useFirebaseService from "../utils/firebase";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useFirebaseService();
  const [loading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        navigate("/upload", { replace: true });
      }
    );
  };

  return (
    <Box
      w="100vw"
      h="92vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box bg="white" p={8} boxShadow="md" borderRadius="md">
        <Text textAlign="center" fontStyle="italic">
          Sign Up to Firebase
        </Text>
        <FormControl
          variant="floating"
          id="email"
          isDisabled={loading}
          my="5"
          isRequired
        >
          <Input
            value={email}
            type="email"
            onChange={handleEmail}
            placeholder=" "
          />
          <FormLabel>Email</FormLabel>
          <FormHelperText fontStyle="italic">May we know you ?</FormHelperText>
        </FormControl>
        <FormControl
          variant="floating"
          id="password"
          isDisabled={loading}
          my="5"
          isRequired
        >
          <Input
            value={password}
            onChange={handlePassword}
            placeholder=" "
            type="password"
          />
          <FormLabel>Password</FormLabel>
          <FormHelperText fontStyle="italic">
            Give us something na
          </FormHelperText>
        </FormControl>
        <Button
          isLoading={loading}
          disabled={email.length === 0 || password.length === 0}
          onClick={handleSubmit}
          w="100%"
        >
          Create New User
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
