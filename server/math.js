const mathsteps = require('mathsteps');
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
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Content-Type', 'application/json');
if(req.query.equ !== undefined && req.query.equ !== ''){
const steps = mathsteps.simplifyExpression(req.query.equ);
if(steps.length !== 0){
doMath(steps).then(function(result){
res.json(result);
})
}else{res.json({"error":"equation could not be simplified","code":"invequ"})}} else {;
res.send('{"error":"empty equation submitted","code":"emptyequ"}')
}
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})