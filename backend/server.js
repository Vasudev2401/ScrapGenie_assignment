import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 5000

const tasks = []

app.use(cors())
app.use(bodyParser.json())

app.post('/',(req,res)=>{
    tasks.push(req.body)
    console.log(tasks)
    res.send("Data received")
})

app.get('/',(req,res)=>{
    res.send(tasks)
})

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Extract id from URL
    const { status } = req.body; // Extract data from request body
  
    // Find the item by id
    const taskIndex = tasks.findIndex((task) => task.id === id);
  
    if (taskIndex !== -1) {
      // Update the item
      tasks[taskIndex] = { ...tasks[taskIndex], status };
      res.json({ message: 'Item updated successfully', item: items[itemIndex] });
    } else {
      // If the item doesn't exist
      res.status(404).json({ message: 'Item not found' });
    }
  });

app.listen(port,()=>{
    console.log(`Server is listening on port:${port}`);
})