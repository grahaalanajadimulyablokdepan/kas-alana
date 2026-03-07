/* PASSWORD LOGIN */

const passwords = [
"ketua123",
"sekretaris123",
"bendahara123",
"korlap123",
"pengurus1",
"pengurus2"
]

function loginAdmin(){

let pass = document.getElementById("adminPass").value

if(passwords.includes(pass)){

document.getElementById("loginBox").style.display = "none"
document.getElementById("adminPanel").style.display = "block"

}else{

alert("Password salah")

}

}


/* FIREBASE */

const db = firebase.firestore()



/* DATA BLOK */

const blokData = {
"A1":20,
"A2":24,
"A3":10,
"B1":20,
"B2":20,
"B3":20
}



/* GENERATE PETA RUMAH */

function generateMap(){

let html=""

for(let blok in blokData){

html+=`
<div class="blok">
<div class="blok-title">Blok ${blok}</div>
<div class="rumah-grid">
`

for(let i=1;i<=blokData[blok];i++){

html+=`
<div class="rumah belum"
onclick="lihatRumah('${blok}',${i})">

${blok}-${i}

</div>
`

}

html+=`</div></div>`

}

document.getElementById("mapPerumahan").innerHTML = html

}

generateMap()



/* TAMBAH IURAN */

function tambahIuran(){

let nama = document.getElementById("nama").value
let blok = document.getElementById("blok").value
let rumah = document.getElementById("rumah").value
let bulan = document.getElementById("bulan").value
let tahun = document.getElementById("tahun").value
let jumlah = document.getElementById("jumlah").value

db.collection("iuran").add({

nama:nama,
blok:blok,
rumah:rumah,
bulan:bulan,
tahun:tahun,
jumlah:Number(jumlah)

})

alert("Iuran berhasil disimpan")

loadIuran()

}



/* TAMBAH PENGELUARAN */

function tambahPengeluaran(){

let ket = document.getElementById("ket").value
let jumlah = document.getElementById("jumlahKeluar").value

db.collection("pengeluaran").add({

ket:ket,
jumlah:Number(jumlah)

})

alert("Pengeluaran disimpan")

loadDashboard()

}



/* LOAD RIWAYAT IURAN */

function loadIuran(){

db.collection("iuran").get().then((snapshot)=>{

let html=""

snapshot.forEach(doc=>{

let d = doc.data()

html+=`
<tr>
<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${d.bulan}</td>
<td>${d.tahun}</td>
<td>Rp${d.jumlah}</td>
</tr>
`

})

document.getElementById("tabelIuran").innerHTML = html

})

}

loadIuran()



/* DASHBOARD */

function loadDashboard(){

let totalIuran = 0
let totalKeluar = 0


db.collection("iuran").get().then((snapshot)=>{

snapshot.forEach(doc=>{

totalIuran += doc.data().jumlah

})

document.getElementById("totalIuran").innerText = "Rp"+totalIuran

})


db.collection("pengeluaran").get().then((snapshot)=>{

snapshot.forEach(doc=>{

totalKeluar += doc.data().jumlah

})

document.getElementById("totalKeluar").innerText = "Rp"+totalKeluar

let totalKas = totalIuran - totalKeluar

document.getElementById("totalKas").innerText = "Rp"+totalKas

})

}

loadDashboard()



/* CEK RUMAH */

function cekRumah(){

let blok = document.getElementById("cekBlok").value
let nomor = document.getElementById("cekNomor").value

db.collection("iuran")
.where("blok","==",blok)
.where("rumah","==",nomor)
.get()
.then(snapshot=>{

if(snapshot.empty){

document.getElementById("hasil").innerHTML =
"Belum ada pembayaran"

}else{

let html=""

snapshot.forEach(doc=>{

let d = doc.data()

html += `
<div>
${d.bulan} ${d.tahun} : Rp${d.jumlah}
</div>
`

})

document.getElementById("hasil").innerHTML = html

}

})

}



/* NOMOR RUMAH */

for(let i=1;i<=25;i++){

let opt=document.createElement("option")

opt.value=i
opt.text=i

document.getElementById("cekNomor").appendChild(opt)

}



/* EXPORT EXCEL */

function exportExcel(){

let table = document.querySelector("table")

let wb = XLSX.utils.table_to_book(table)

XLSX.writeFile(wb,"laporan-kas.xlsx")

}



/* KLIK RUMAH */

function lihatRumah(blok,no){

alert("Rumah "+blok+"-"+no)

}
