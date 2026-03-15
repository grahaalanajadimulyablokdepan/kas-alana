let db = firebase.firestore()

function generateRumah(){

let blok=document.getElementById("blok").value
let rumah=document.getElementById("rumah")

rumah.innerHTML=""

if(blok=="") return

let jumlah=0

if(blok=="A1") jumlah=18
if(blok=="A2") jumlah=24
if(blok=="A3") jumlah=10
if(blok=="B1") jumlah=20
if(blok=="B2") jumlah=20
if(blok=="B3") jumlah=20

for(let i=1;i<=jumlah;i++){

let opt=document.createElement("option")

opt.value=i
opt.text="Rumah "+i

rumah.appendChild(opt)

}

}

function login(){

let blok=document.getElementById("blok").value
let rumah=document.getElementById("rumah").value
let pass=document.getElementById("password").value

if(pass>="1" && pass<="8"){

localStorage.setItem("userBlok",blok)
localStorage.setItem("userRumah",rumah)
localStorage.setItem("role","warga")

location.href="dashboard.html"

}else{

alert("Password salah")

}

}

function loginAdmin(){

let pass=document.getElementById("password").value

if(pass=="12345"){

localStorage.setItem("role","admin")

location.href="dashboard.html"

}

}

function loadDashboard(){

let role=localStorage.getItem("role")

if(role!="admin"){

let adminMenu=document.getElementById("adminMenu")

if(adminMenu) adminMenu.style.display="none"

}

hitungKas()

}

function hitungKas(){

let totalIuran=0
let totalKeluar=0

db.collection("iuran").get().then(snap=>{

snap.forEach(doc=>{

totalIuran+=doc.data().jumlah

})

document.getElementById("totalIuran").innerText="Rp "+totalIuran.toLocaleString()

})

db.collection("pengeluaran").get().then(snap=>{

snap.forEach(doc=>{

totalKeluar+=doc.data().jumlah

})

document.getElementById("totalKeluar").innerText="Rp "+totalKeluar.toLocaleString()

let kas=totalIuran-totalKeluar

document.getElementById("totalKas").innerText="Rp "+kas.toLocaleString()

})

}

function logout(){

localStorage.clear()

location.href="index.html"

}

function toggleMenu(){

let menu=document.getElementById("sideMenu")

menu.classList.toggle("show")

}

function showPopup(id){

document.getElementById(id).style.display="flex"

}

function closePopup(id){

document.getElementById(id).style.display="none"

}

function simpanIuran(){

let blok=document.getElementById("iuranBlok").value
let rumah=document.getElementById("iuranRumah").value
let jumlah=Number(document.getElementById("jumlahIuran").value)

db.collection("iuran").add({

blok:blok,
rumah:rumah,
jumlah:jumlah,
tanggal:new Date()

})

alert("Iuran tersimpan")

closePopup("popupIuran")

hitungKas()

}

function simpanKeluar(){

let ket=document.getElementById("ketKeluar").value
let jumlah=Number(document.getElementById("jumlahKeluar").value)

db.collection("pengeluaran").add({

keterangan:ket,
jumlah:jumlah,
tanggal:new Date()

})

alert("Pengeluaran tersimpan")

closePopup("popupKeluar")

hitungKas()

}

function kirimKomplain(){

let pesan=document.getElementById("pesanKomplain").value

let blok=localStorage.getItem("userBlok")
let rumah=localStorage.getItem("userRumah")

db.collection("komplain").add({

blok:blok,
rumah:rumah,
pesan:pesan,
tanggal:new Date()

})

alert("Komplain terkirim")

closePopup("popupKomplain")

}

function loadKomplain(){

db.collection("komplain").orderBy("tanggal","desc")

.onSnapshot(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let data=doc.data()

html+=`

<div class="komplainItem">

<b>${data.blok}-${data.rumah}</b>

<p>${data.pesan}</p>

</div>

`

})

document.getElementById("listKomplain").innerHTML=html

})

}

function exportExcel(){

db.collection("iuran").get().then(snapshot=>{

let csv="Blok,Rumah,Jumlah\n"

snapshot.forEach(doc=>{

let d=doc.data()

csv+=`${d.blok},${d.rumah},${d.jumlah}\n`

})

let blob=new Blob([csv])

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="data_iuran.csv"

a.click()

})

}
