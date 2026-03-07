const passwords=[
"ketua123",
"sekretaris123",
"bendahara123",
"korlap123",
"pengurus1",
"pengurus2"
]

function loginAdmin(){

let pass=document.getElementById("adminPass").value

if(passwords.includes(pass)){

document.getElementById("loginBox").style.display="none"

}else{

alert("Password salah")

}

}


/* NOMOR RUMAH */

let cekNomor=document.getElementById("cekNomor")

if(cekNomor){

for(let i=1;i<=25;i++){

let opt=document.createElement("option")

opt.value=i
opt.text=i

cekNomor.appendChild(opt)

}

}


/* STATUS RUMAH */

function loadStatus(){

let html=""

let blok=["A1","A2","A3","B1","B2","B3"]

blok.forEach(b=>{

for(let i=1;i<=25;i++){

let status=Math.random()>0.5?"lunas":"belum"

html+=`<div class="${status}">${b}-${i}</div>`

}

})

let statusBox=document.getElementById("statusRumah")

if(statusBox){

statusBox.innerHTML=`<div class="status-box">${html}</div>`

}

}

loadStatus()


/* EXPORT EXCEL */

function exportExcel(){

let table=document.getElementById("tabelIuran")

let wb=XLSX.utils.table_to_book(table)

XLSX.writeFile(wb,"laporan-kas.xlsx")

}


/* PETA RUMAH */

const blokData={
"A1":20,
"A2":24,
"A3":10,
"B1":20,
"B2":20,
"B3":20
}

function generateMap(){

let html=""

for(let blok in blokData){

html+=`<div class="blok">
<div class="blok-title">Blok ${blok}</div>
<div class="rumah-grid">`

for(let i=1;i<=blokData[blok];i++){

let status="belum"

html+=`
<div class="rumah ${status}" 
onclick="lihatRumah('${blok}',${i},'${status}')">

${blok}-${i}

</div>`

}

html+=`</div></div>`

}

let map=document.getElementById("mapPerumahan")

if(map){
map.innerHTML=html
}

}

function lihatRumah(blok,no,status){

let teks=status=="lunas"?"LUNAS":"BELUM BAYAR"

alert(`Rumah ${blok}-${no}
Status: ${teks}`)

}

generateMap()
