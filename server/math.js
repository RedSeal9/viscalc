const mathsteps = require('mathsteps');
const url = require('url');
const querystring = require('querystring');
const express = require('express');
const app = express();
const port = 3000;

async function doMath(steps){
var rez = {};
var num = 0;

steps.forEach(step => {
rez[num] = {};
	rez[num]['old'] = step.oldNode.toString();
	rez[num]['type'] = step.changeType;
	rez[num]['new'] = step.newNode.toString();
	rez[num]['length'] = step.substeps.length;
num ++;
});
return rez;
}

app.get('/',async (req, res) => {
if(req.query.equ !== undefined){
const steps = mathsteps.simplifyExpression(req.query.equ);

doMath(steps).then(function(result){
res.send(JSON.stringify(result));
})
} else {;
res.send('{"error":"url incorrect"}')
}
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})