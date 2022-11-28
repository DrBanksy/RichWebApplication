import './App.css';
import { Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <VStack spacing='10px'>
        <div
        style={{
          width: "300px",
          margin: "20px auto",
          background: "green",
          border: "1px solid #333",
        }}
      >
        <p>Note ID: 1</p>
        <p>soaivhoashvioashvioahoihsaovhasiov</p>
        <ButtonGroup variant='outline' spacing='6'>
          <Button colorScheme='blue'>Edit</Button>
          <Button>Delete</Button>
        </ButtonGroup>
        </div>
      </VStack>
    </div>
  );
}

export default App;
