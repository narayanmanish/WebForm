const express = require('express')
const details = require('./data/data')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const Router = require('./routes/route')
const port = process.env.PORT || 5000
const path=require('path')
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true,useUnifiedTopology: true});

const db= mongoose.connection
db.once('open',() => console.log('connected db'))

app.use(express.json())

app.use('/api/details',Router)

app.use(express.static(path.join(__dirname,'../client/bulid')))
app.get('*',(req,res) => res.sendFile(path.join(__dirname,'../client/bulid/index.html')))


app.listen(port, () => {
 
})