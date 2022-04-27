var express = require("express");
var solc = require("solc");
var cors = require("cors");
var fs = require("fs");
var path = require("path");

var app = express();
app.use(cors());

app.listen(3000);
app.get('/', (req, res) => {
    const contractPath = path.resolve(__dirname,'contracts','FoodSafe.sol')
    var contractSource= fs.readFileSync(contractPath).toString('utf-8');
    var compiledContract = solc.compile(contractSource);

    res.status(200).send(compiledContract);
})