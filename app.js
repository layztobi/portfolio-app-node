const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{
    let filePath = path.join(__dirname,'routes',req.url ==='/' ?'index.html':req.url)
    let contentType = getContentType(filePath)  || 'text/html'
    fs.readFile(filePath, 'utf8',(err,content)=>{
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404)
                res.end('Page Not Found')
            }else {
                res.writeHead(500)
                res.end('A server error has occured')
            }
        }else {
            res.writeHead(200,{'Content-Type': contentType})
            res.end(content)
        }
    })
})
const getContentType = (filePath)=>{
    let extname = path.extname(filePath)
    if(extname ==='.js'){
        return 'text/javascript'
    }
    if(extname ==='.css'){
        return 'text/css'
    }
    if(extname ==='.png'){
        return 'image/png'
    }
    if(extname ==='.jpg'){
        return 'image/jpg'
    }
}
const port = 5000
server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})