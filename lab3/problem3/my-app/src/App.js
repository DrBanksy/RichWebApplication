import './App.css';
import { Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Note from "./Components/Note";

function App() {
  return (
    <div className="App">
      <VStack spacing='10px'>
        <Note></Note>
        <Note></Note>
      </VStack>
    </div>
  );
}

export default App;
