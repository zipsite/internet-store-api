const express = require("express")
const { config } = require("dotenv");
const path = require('path')

rundir = path.join(__dirname)
config()


const app = express();

app.use(express.json());

const api = require("./routes/api.js")
app.use('/api', api)

app.get('/', (req, res)=> {
    res.send("yes");
})

port = 8000;

app.listen(port, () => console.log(`Listening on port ${port}...`));