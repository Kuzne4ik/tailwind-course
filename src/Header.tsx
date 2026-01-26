import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export interface IDetails {
  title: string,
  description: string,
  buttontext: string
}


function Header() {
  //const [count, setCount] = useState(0)
  //const [title, setTitle] = useState('OLD TITLE')

  const {isLoggedIn} = useContext(AuthContext)

  return (
    <>
      <div style={{
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'
      }}>
        
        {
        isLoggedIn ? ( 
            <span>HI</span>
          ) :
          (
            <span >Goodby</span>
          )
        }
        
      </div>
    </>
  )
}

export default Header
