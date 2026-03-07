/* PASSWORD LOGIN */

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
document.getElementById("adminPanel").style.display="block"

}else{

alert("Password salah")

}

}


/* FORMAT RUPIAH */

function rupiah(n){
return "Rp"+Number(n).toLocaleString("id-ID")
}


/* TAMBAH IURAN */

let prosesIuran=false

function tambahIuran(){

if(prosesIuran)return
prosesIuran=true

let nama=document.getElementById("nama").value
let blok=document.getElementById("blok").value
let rumah=document.getElementById("rumah").value
let bulan=document.getElementById("bulan").value
let tahun=document.getElementById("tahun").value
let jumlah=document.getElementById("jumlah").value

if(!nama||!rumah||!jumlah){

alert("Data belum lengkap")
prosesIuran=false
return

}

db.collection("iuran")
.where("blok","==",blok)
.where("rumah","==",rumah)
.where("bulan","==",bulan)
.where("tahun","==",tahun)
.get()
.then(snapshot=>{

if(!snapshot.empty){

alert("Rumah ini sudah membayar bulan tersebut")
prosesIuran=false
return

}

db.collection("iuran").add({

nama:nama,
blok:blok,
rumah:rumah,
bulan:bulan,
tahun:tahun,
jumlah:Number(jumlah)

}).then(()=>{

alert("Iuran berhasil disimpan")

document.getElementById("nama").value=""
document.getElementById("rumah").value=""
document.getElementById("jumlah").value=""

loadIuran()
loadDashboard()
updateMap()

prosesIuran=false

})

})

}


/* TAMBAH PENGELUARAN */

function tambahPengeluaran(){

let ket=document.getElementById("ket").value
let jumlah=document.getElementById("jumlahKeluar").value

if(!ket||!jumlah){

alert("Data belum lengkap")
return

}

db.collection("pengeluaran").add({

ket:ket,
jumlah:Number(jumlah)

}).then(()=>{

alert("Pengeluaran berhasil disimpan")

document.getElementById("ket").value=""
document.getElementById("jumlahKeluar").value=""

loadDashboard()

})

}


/* LOAD RIWAYAT IURAN */

function loadIuran(){

db.collection("iuran").get().then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let d=doc.data()

html+=`

<tr>
<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${d.bulan}</td>
<td>${d.tahun}</td>
<td>${rupiah(d.jumlah)}</td>
</tr>

`

})

document.getElementById("tabelIuran").innerHTML=html

})

}


/* DASHBOARD */

function loadDashboard(){

let totalIuran=0
let totalKeluar=0

db.collection("iuran").get().then(snapshot=>{

snapshot.forEach(doc=>{
totalIuran+=doc.data().jumlah
})

document.getElementById("totalIuran").innerText=rupiah(totalIuran)

db.collection("pengeluaran").get().then(snapshot=>{

snapshot.forEach(doc=>{
totalKeluar+=doc.data().jumlah
})

document.getElementById("totalKeluar").innerText=rupiah(totalKeluar)

let kas=totalIuran-totalKeluar

document.getElementById("totalKas").innerText=rupiah(kas)

})

})

}


/* EXPORT EXCEL */

function exportExcel(){

let table=document.querySelector("table")

let wb=XLSX.utils.table_to_book(table)

XLSX.writeFile(wb,"laporan-kas.xlsx")

}


/* DATA BLOK RUMAH */

const blokData={
"A1":20,
"A2":24,
"A3":10,
"B1":20,
"B2":20,
"B3":20
}


/* GENERATE MAP */

function generateMap(){

let html=""

for(let blok in blokData){

html+=`

<div class="blok">
<h6>Blok ${blok}</h6>
<div class="rumah-grid">

`

for(let i=1;i<=blokData[blok];i++){

html+=`

<div class="rumah belum" id="${blok}-${i}">
${blok}-${i}
</div>

`

}

html+=`

</div>
</div>

`

}

document.getElementById("mapPerumahan").innerHTML=html

updateMap()

}


/* UPDATE STATUS MAP */

function updateMap(){

db.collection("iuran").get().then(snapshot=>{

snapshot.forEach(doc=>{

let d=doc.data()

let id=d.blok+"-"+d.rumah

let el=document.getElementById(id)

if(el){

el.classList.remove("belum")
el.classList.add("lunas")

}

})

})

}


/* POPUP TOTAL KAS */

function showKas(){

let totalIuran=0
let totalKeluar=0

db.collection("iuran").get().then(snapshot=>{

snapshot.forEach(doc=>{
totalIuran+=doc.data().jumlah
})

db.collection("pengeluaran").get().then(snapshot=>{

snapshot.forEach(doc=>{
totalKeluar+=doc.data().jumlah
})

let kas=totalIuran-totalKeluar

document.getElementById("detailIuran").innerText=rupiah(totalIuran)
document.getElementById("detailKeluar").innerText=rupiah(totalKeluar)
document.getElementById("detailKas").innerText=rupiah(kas)

new bootstrap.Modal(document.getElementById("modalKas")).show()

})

})

}


/* POPUP IURAN */

function showIuran(){

let html=""

db.collection("iuran").get().then(snapshot=>{

snapshot.forEach(doc=>{

let d=doc.data()

html+=`

<tr>
<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${d.bulan}</td>
<td>${d.tahun}</td>
<td>${rupiah(d.jumlah)}</td>
</tr>

`

})

document.getElementById("detailTabelIuran").innerHTML=html

new bootstrap.Modal(document.getElementById("modalIuran")).show()

})

}


/* POPUP PENGELUARAN */

function showKeluar(){

let html=""

db.collection("pengeluaran").get().then(snapshot=>{

snapshot.forEach(doc=>{

let d=doc.data()

html+=`

<tr>
<td>${d.ket}</td>
<td>${rupiah(d.jumlah)}</td>
</tr>

`

})

document.getElementById("detailTabelKeluar").innerHTML=html

new bootstrap.Modal(document.getElementById("modalKeluar")).show()

})

}


/* LOAD AWAL WEBSITE */

loadDashboard()
loadIuran()
generateMap()
