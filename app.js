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

})

loadData()

}

function tambahPengeluaran(){

let ket=document.getElementById("ket").value
let jumlah=document.getElementById("jumlahKeluar").value

db.collection("pengeluaran").add({

ket:ket,
jumlah:Number(jumlah)

})

loadData()

}



function loadData(){

let totalIuran=0
let totalKeluar=0

let rumahBayar=[]

db.collection("iuran").get().then(s=>{

let html=""

s.forEach(doc=>{

let d=doc.data()

totalIuran+=d.jumlah

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

document.getElementById("tabelIuran").innerHTML=html

document.getElementById("totalIuran").innerText=rupiah(totalIuran)

document.getElementById("detailTotalIuran").innerText=rupiah(totalIuran)
document.getElementById("detailTotalIuran2").innerText=rupiah(totalIuran)



db.collection("pengeluaran").get().then(p=>{

let htmlKeluar=""

p.forEach(doc=>{

let d=doc.data()

totalKeluar+=d.jumlah

htmlKeluar+=`

<tr>

<td>${d.ket}</td>
<td>${rupiah(d.jumlah)}</td>

</tr>

`

})

document.getElementById("tabelPengeluaran").innerHTML=htmlKeluar

document.getElementById("totalKeluar").innerText=rupiah(totalKeluar)

document.getElementById("detailTotalKeluar").innerText=rupiah(totalKeluar)
document.getElementById("detailTotalKeluar2").innerText=rupiah(totalKeluar)



let kas=totalIuran-totalKeluar

document.getElementById("totalKas").innerText=rupiah(kas)
document.getElementById("detailTotalKas").innerText=rupiah(kas)



updateMap(rumahBayar)

generateBelumBayar(rumahBayar)

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

document.getElementById("rumahBelumBayar").innerHTML=html

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

document.getElementById("mapPerumahan").innerHTML=html

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
let totalRumah=0

for(let b in blokData){

totalRumah+=blokData[b]

}

let sudahBayar=rumahBayar.length

let belumBayar=totalRumah-sudahBayar

document.getElementById("totalRumah").innerText=totalRumah
document.getElementById("rumahBayar").innerText=sudahBayar
document.getElementById("rumahBelum").innerText=belumBayar

let persen=Math.round((sudahBayar/totalRumah)*100)

let bar=document.getElementById("progressBayar")

bar.style.width=persen+"%"
bar.innerText=persen+"%"
