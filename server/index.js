import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.get('/', (req,res)=>{
    res.send('API running')
})
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`))