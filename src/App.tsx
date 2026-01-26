import { useContext, useEffect, useState } from 'react'
import './App.scss'
import Details from './Details'
import { AuthContext } from './AuthContext'
import Header from './Header'
import { Link } from 'react-router-dom'

export interface IDetails {
  title: string,
  description: string,
  buttontext: string
}

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number
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

  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
      const fetchData = async() => {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setTodos(data);
      }
      fetchData();
  }, []);

  //const navigate = useNavigate();

  
  return (
    <>
    
      <Header></Header>

      <div style={{
        padding: 10
      }}>

        <Link to='/aboutus'>About US</Link>

        {/* Компонент из файла tsx! */}
        <Details details={details} setDetails={setDetails} />
        <label>ToDo`s:</label>
        <ul>
          {todos?.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>

        
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
