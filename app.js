const express = require('express')
const app = express()
const morgan = require('morgan')
const data = require('./data.js')
app.use(morgan('dev'))


app.get("/" , (req, res, next) => {
    const breweries = data.list()
    const html = 
    `<!DOCTYPE html>
    <html>
        <head>
            <title>Breweries</title>
        </head>
        <body>
        <h1>Breweries</h1>
        <div>
        <ul>
            ${breweries.map(brewery => `
            <li><a href = "/breweries/${brewery.id}">${brewery.name}</li></a>
                
            
            `).join('')}
        </ul>
        
        </div>
        </body>
    </html>
    
    `
    res.send(html)
})

app.get("/breweries/:id", (req,res,next)=>{
    const brewery = data.find(req.params.id)
    if(!brewery) {
        return next(new Error('page not found'))
    }    
    //const breweries = [ breweryId ]
    //console.log(breweries)
    const html = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Breweries</title>
        </head>
        <body>
        <a href="/">Go Back and Explore</a>
        <h1>Brewery Info</h1>
        <div>
        
        <i class="fa-light fa-beer-mug"></i>
        <h3>${brewery.name}</h3>
       

            <div>
            <h5>${brewery.brewery_type}</h5>
            <h5>${brewery.street}</h5>
            <p>${brewery.about}</p>
            </div>
       
        </div>
        </body>
    </html>
    `
    res.send(html)
    

})

const port = 3000
app.listen(port,() => console.log(`listening on port ${port}`))