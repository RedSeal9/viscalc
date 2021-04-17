var input;
var go;
var output;
function init(){
//options

input = document.getElementById('equ');
go = document.getElementById('go');
output = document.getElementById('output');


//options
go.addEventListener("click",makereq);
}
function makereq(){
fetch('http://localhost:3000?equ='
+encodeURIComponent(input.value)).then((result) => {
setRes(result);
})
}

function setRes(res){
output.innerHTML = '';
var rst;
res.text().then((value)=>{rst = JSON.parse(value)})
.then(()=>{
if(rst.code == 'invequ'){
output.innerHTML = '<span style="color:red">'+rst.error+'</span>';
}})
.then(()=>{
for (i = 0, len = Object.keys(rst).length; i < len; i++) {
rs = rst[i];
var node = document.createElement("pre");
node.innerHTML = `
Old: ${rs.old}
New: ${rs.new}
Changes: ${rs.type}
<br>
`
output.appendChild(node)
}})
.then(()=>{
var node = document.createElement('span');
node.innerHTML = `
Final Answer: <code>${rst[Object.keys(rst).length-1].new}</code>
`;
output.appendChild(node);
})
}

window.addEventListener("load", init, false);