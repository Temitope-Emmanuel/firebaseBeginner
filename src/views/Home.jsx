import React from 'react';
import {Box, FormControl, Input, FormLabel, FormHelperText, Text, Button} from "@chakra-ui/react";

const Home = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    return(
        <Box w='100vw' h='92vh' display='flex' justifyContent='center' alignItems='center'>
            <Box bg='white' p={8} boxShadow='md' borderRadius='md'>
                <Text textAlign='center' fontStyle='italic'>Sign Up to Firebase</Text>
                <FormControl variant='floating' id='username' my="5" isRequired>
                    <Input value={username} onChange={handleUsername} placeholder=' ' />
                    <FormLabel>username</FormLabel>
                    <FormHelperText fontStyle='italic'>May we know you ?</FormHelperText>
                </FormControl>
                <FormControl variant='floating' id='password' my="5" isRequired>
                    <Input value={password} onChange={handlePassword} placeholder=' ' type='password' />
                    <FormLabel>password</FormLabel>
                    <FormHelperText fontStyle='italic'>Give us something na</FormHelperText>
                </FormControl>
                <Button w="100%">Create New User</Button>
            </Box>
        </Box>
    )
}

export default Home