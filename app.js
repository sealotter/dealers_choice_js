const express = require('express')
const app = express()

app.get("/" , (req,res,next) => {
    res.send('hello')
})

const port = 3000
app.listen(port,() => console.log(`listening on port ${port}`))