import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Form from './components/Form'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  return (
    <ChakraProvider>
      <div className='app'>
        {user ? <h1>Congratulations, you have successfully registered</h1> : <Form setUser={setUser} />}
      </div>
    </ChakraProvider>
  )
}

export default App
