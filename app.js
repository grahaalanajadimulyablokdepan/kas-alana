const passwords=["ketua123","bendahara123"]

function loginAdmin(){

let pass=document.getElementById("adminPass").value

if(passwords.includes(pass)){

document.getElementById("loginBox").style.display="none"
document.getElementById("adminPanel").style.display="block"

}

}

function rupiah(n){
return "Rp"+Number(n).toLocaleString("id-ID")
}



function tambahIuran(){

let nama=document.getElementById("nama").value
let blok=document.getElementById("blok").value
let rumah=document.getElementById("rumah").value
let jumlah=document.getElementById("jumlah").value

db.collection("iuran").add({
nama:nama,
blok:blok,
rumah:rumah,
jumlah:Number(jumlah)
}).then(()=>{
loadData()
})

}



function tambahPengeluaran(){

let ket=document.getElementById("ket").value
let jumlah=document.getElementById("jumlahKeluar").value

db.collection("pengeluaran").add({
ket:ket,
jumlah:Number(jumlah)
}).then(()=>{
loadData()
})

}



function loadData(){

let totalIuran=0
let totalKeluar=0
let rumahBayar=[]



db.collection("iuran").get().then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let d=doc.data()

totalIuran+=Number(d.jumlah)

rumahBayar.push(d.blok+"-"+d.rumah)

html+=`
<tr>
<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${rupiah(d.jumlah)}</td>
</tr>
`

})



let tabel=document.getElementById("tabelIuran")
if(tabel) tabel.innerHTML=html

let elTotalIuran=document.getElementById("totalIuran")
if(elTotalIuran) elTotalIuran.innerText=rupiah(totalIuran)



db.collection("pengeluaran").get().then(snapshot2=>{

let htmlKeluar=""

snapshot2.forEach(doc=>{

let d=doc.data()

totalKeluar+=Number(d.jumlah)

htmlKeluar+=`
<tr>
<td>${d.ket}</td>
<td>${rupiah(d.jumlah)}</td>
</tr>
`

})



let tabelKeluar=document.getElementById("tabelPengeluaran")
if(tabelKeluar) tabelKeluar.innerHTML=htmlKeluar

let elKeluar=document.getElementById("totalKeluar")
if(elKeluar) elKeluar.innerText=rupiah(totalKeluar)



let kas=totalIuran-totalKeluar

let elKas=document.getElementById("totalKas")
if(elKas) elKas.innerText=rupiah(kas)



updateMap(rumahBayar)

generateBelumBayar(rumahBayar)



// =======================
// STATISTIK RUMAH
// =======================

let totalRumah=0

for(let b in blokData){
totalRumah+=blokData[b]
}

let sudahBayar=rumahBayar.length
let belumBayar=totalRumah-sudahBayar



let elTotalRumah=document.getElementById("totalRumah")
if(elTotalRumah) elTotalRumah.innerText=totalRumah

let elSudah=document.getElementById("rumahBayar")
if(elSudah) elSudah.innerText=sudahBayar

let elBelum=document.getElementById("rumahBelum")
if(elBelum) elBelum.innerText=belumBayar



// =======================
// PROGRESS BAR
// =======================

let persen=0

if(totalRumah>0){
persen=Math.round((sudahBayar/totalRumah)*100)
}

let bar=document.getElementById("progressBayar")

if(bar){
bar.style.width=persen+"%"
bar.innerText=persen+"%"
}



})

})

}



function generateBelumBayar(rumahBayar){

let html=""

for(let blok in blokData){

for(let i=1;i<=blokData[blok];i++){

let kode=blok+"-"+i

if(!rumahBayar.includes(kode)){
html+=`<div>${kode}</div>`
}

}

}

let el=document.getElementById("rumahBelumBayar")

if(el) el.innerHTML=html

}



function exportExcel(){

let table=document.querySelector("table")

let wb=XLSX.utils.table_to_book(table)

XLSX.writeFile(wb,"laporan-kas.xlsx")

}



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
<h6>${blok}</h6>
<div class="rumah-grid">`

for(let i=1;i<=blokData[blok];i++){

html+=`<div id="${blok}-${i}" class="rumah belum">${blok}-${i}</div>`

}

html+=`</div></div>`

}

let map=document.getElementById("mapPerumahan")

if(map){
map.innerHTML=html
}

}



function updateMap(rumahBayar){

rumahBayar.forEach(r=>{

let el=document.getElementById(r)

if(el){
el.classList.remove("belum")
el.classList.add("lunas")
}

})

}



generateMap()
loadData()
