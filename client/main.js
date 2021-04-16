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
//var rst;
res.text().then((value)=>{rst = JSON.parse(value)})
.then(()=>{
for (i = 0, len = Object.keys(rst).length; i < len; i++) {
var node = document.createElement("div");
node.innerHTML = JSON.stringify(rst[i]);
output.appendChild(node)
}})
}

window.addEventListener("load", init, false);