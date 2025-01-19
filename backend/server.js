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


app.listen(port,()=>{
    console.log(`Server is listening on port:${port}`);
})