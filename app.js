let chartKas=null

let blokData={
"A1":18,
"A2":24,
"A3":10,
"B1":20,
"B2":20,
"B3":20
}

let semuaRumah=[]
let rumahBayar=[]

function rupiah(n){
return "Rp"+Number(n).toLocaleString("id-ID")
}

function toggleMenu(){
document.getElementById("sideMenu")
.classList.toggle("open")
}

function loadData(){

let totalIuran=0
let totalKeluar=0

db.collection("iuran").onSnapshot(s=>{

rumahBayar=[]
totalIuran=0

s.forEach(doc=>{

let d=doc.data()

totalIuran+=Number(d.nominal)

rumahBayar.push(d.blok+"-"+d.rumah)

})

document.getElementById("totalIuran").innerText=rupiah(totalIuran)

updateRumahBelumBayar()

})

db.collection("pengeluaran").onSnapshot(p=>{

totalKeluar=0

p.forEach(doc=>{

totalKeluar+=Number(doc.data().nominal)

})

document.getElementById("totalKeluar").innerText=rupiah(totalKeluar)

let kas=totalIuran-totalKeluar

document.getElementById("totalKas").innerText=rupiah(kas)

updateChart(totalIuran,totalKeluar)

})

}

function updateChart(iuran,keluar){

let kas=iuran-keluar

let ctx=document.getElementById("chartKas").getContext("2d")

if(chartKas) chartKas.destroy()

chartKas=new Chart(ctx,{
type:"bar",
data:{
labels:["Iuran","Pengeluaran","Kas"],
datasets:[{
data:[iuran,keluar,kas],
backgroundColor:["#198754","#dc3545","#0d6efd"]
}]
}
})

}

function generateRumah(){

for(let blok in blokData){

let jumlah=blokData[blok]

for(let i=1;i<=jumlah;i++){

let nomor=String(i).padStart(2,"0")

semuaRumah.push(blok+"-"+nomor)

}

}

}

function updateRumahBelumBayar(){

let belum=semuaRumah.filter(r=>!rumahBayar.includes(r))

let html=""

belum.forEach(r=>{
html+=`<span class="badge bg-danger">${r}</span>`
})

document.getElementById("rumahBelumBayar").innerHTML=html

}

function generateMap(){

let html=""

for(let blok in blokData){

html+=`<h6>${blok}</h6>`
html+=`<div class="blok">`

for(let i=1;i<=blokData[blok];i++){

let nomor=String(i).padStart(2,"0")

let kode=blok+"-"+nomor

html+=`<div id="${kode}" class="rumah">${nomor}</div>`

}

html+=`</div>`

}

document.getElementById("mapPerumahan").innerHTML=html

}

function exportExcel(){

let table=document.querySelector("table")

let wb=XLSX.utils.table_to_book(table)

XLSX.writeFile(wb,"kas_graha_alana.xlsx")

}

generateRumah()
generateMap()
loadData()
