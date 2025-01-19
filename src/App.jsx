import { useState } from 'react'
import {useForm} from 'react-hook-form'
import './App.css'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([])
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    data.id = tasks.length + 1
    data.status = 'pending'

console.log(data);

   axios.post('http://localhost:5000',data)
   .then((response)=>{
    console.log(response)})
   .catch((error)=>{console.log(error);
   })

    setTimeout(() => {
      getData()
    }, 1000)
}

const getData = ()=>{
  axios.get('http://localhost:5000')
  .then((response)=>{
    setTasks(response.data)
    console.log(response.data)
  })
  .catch((error)=>{console.log(error)})
  }


  const inProgressButton = (e) => {
    const id = e.target.id
    const url = 'https://localhost:5000/tasks/:' + id;
    const data = {
      status: 'in progress'
    };
  
    axios.put(url, data)
    .then(()=>{console.log('Response:', response.data);})
    .catch ((error)=>{console.error('Error:', error);})
  }


  const completedButton = (e) => {
    const id = e.target.id
    const url = 'https://localhost:5000/tasks/:' + id;
    const data = {
      status: 'completed'
    };
  
    axios.put(url, data)
    .then(()=>{console.log('Response:', response.data);})
    .catch ((error)=>{console.error('Error:', error);})
  };

  return (
    <>
     <div>
      <h1>
        Task Managment
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
       <input type="text" {...register("title")} name="title" placeholder='Enter the task title' id="" />
       <br />
       <input type="textarea" {...register("description")} name="description" placeholder='Enter the task details' id="" />
       <br />
       <input type="text" {...register("dueDate")} name="dueDate" placeholder='Enter due date' id="" />
       <br />
       <input type="submit" value="Submit" />
      </form>
     </div>

     <div>
      <h2>
        Task List
      </h2>
      {tasks.map((task)=>(
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.dueDate}</p>
          <button onClick={inProgressButton}>In Progress</button>
          <button onClick={completedButton}>Completed</button>
        </div>
      )
      )}
     </div>
    </>
  )
}

export default App
