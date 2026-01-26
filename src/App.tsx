import { useContext, useState } from 'react'
import './App.scss'
import Details from './Details'
import { AuthContext } from './AuthContext'
import Header from './Header'

export interface IDetails {
  title: string,
  description: string,
  buttontext: string
}


function App() {
  //const [count, setCount] = useState(0)
  //const [title, setTitle] = useState('OLD TITLE')

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)


  const [details, setDetails] = useState({
    title: 'OLD TITLE',
    description: 'Hello world',
    buttontext: 'Click'
  })

  return (
    <>
      <Header></Header>

      <div style={{
        padding: 10
      }}>

        {/* Компонент из файла tsx! */}
        <Details details={details} setDetails={setDetails} />

        
        <br></br>
        {
          isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)}>Выйти</button>
          ) :
          (
            <button onClick={() => setIsLoggedIn(true)}>Войти</button>
          )
        }

        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
