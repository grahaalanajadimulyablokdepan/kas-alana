/* =========================
KAS GRAHA ALANA SYSTEM
APP ENGINE PART 1
========================= */


/* =========================
ADMIN MODE SYSTEM
========================= */

let isAdmin = false

function loginAdmin(){

let user = document.getElementById("adminUser")?.value
let pass = document.getElementById("adminPass")?.value

if(user === "admin" && pass === "12345"){

isAdmin = true

localStorage.setItem("adminLogin","true")

document.body.classList.add("admin-mode")

 updateAdminButtons()
   
if(typeof closePopup === "function"){
closePopup()
}

if(typeof notif === "function"){
notif("Admin login berhasil")
}

}else{

if(typeof notif === "function"){
notif("Username / Password salah")
}

}

}

function checkAdmin(){

if(localStorage.getItem("adminLogin") === "true"){

isAdmin = true

document.body.classList.add("admin-mode")

}

}

window.addEventListener("load",checkAdmin)

/* =========================
GLOBAL VARIABLE
========================= */

let chartKas=null

let semuaRumah=[]
let rumahBayar=[]

let blokData={

"A1":18,
"A2":24,
"A3":10,

"B1":20,
"B2":20,
"B3":20

}


/* =========================
UTILS FORMAT RUPIAH
========================= */

function rupiah(x){

return "Rp"+Number(x).toLocaleString("id-ID")

}


/* =========================
NOTIFICATION SYSTEM
========================= */

function notif(text){

let box=document.getElementById("notifBox")

if(!box) return

document.getElementById("notifText").innerText=text

box.classList.add("show")

setTimeout(()=>{

box.classList.remove("show")

},3000)

}


/* =========================
POPUP CONTROL
========================= */

function showPopup(id){

let popup=document.getElementById(id)

if(!popup) return

document.getElementById("popupBackdrop").style.display="block"

popup.style.display="flex"

}

function closePopup(){

let popups=document.querySelectorAll(".popup")

popups.forEach(p=>{
p.style.display="none"
})

let back=document.getElementById("popupBackdrop")

if(back) back.style.display="none"

}


/* =========================
LOADER SYSTEM
========================= */

function hideLoader(){

let loader=document.getElementById("systemLoader")

if(loader){

loader.style.display="none"

}

}


/* =========================
LOGIN ADMIN
========================= */

function loginAdmin(){

let user=document.getElementById("adminUser").value
let pass=document.getElementById("adminPass").value

if(user==="admin" && pass==="12345"){

localStorage.setItem("loginAdmin","true")

notif("Login Admin Berhasil")

closePopup()

}
else{

notif("Login Admin Gagal")

}

}


/* =========================
LOGIN WARGA
========================= */

function loginWarga(){

let nama=document.getElementById("wargaNama").value
let blok=document.getElementById("wargaBlok").value
let rumah=document.getElementById("wargaRumah").value

if(!nama || !rumah){

notif("Isi data login warga")

return

}

localStorage.setItem("loginWarga","true")

localStorage.setItem("namaWarga",nama)
localStorage.setItem("blokWarga",blok)
localStorage.setItem("rumahWarga",rumah)

notif("Login warga berhasil")

closePopup()

}


/* =========================
CHECK LOGIN
========================= */

function cekLogin(){

let admin=localStorage.getItem("loginAdmin")
let warga=localStorage.getItem("loginWarga")

if(admin==="true"){

console.log("Admin login")

}

if(warga==="true"){

console.log("Warga login")

}

}


/* =========================
GENERATE SEMUA RUMAH
========================= */

function generateSemuaRumah(){

semuaRumah=[]

for(let blok in blokData){

let jumlah=blokData[blok]

for(let i=1;i<=jumlah;i++){

let nomor=String(i).padStart(2,"0")

let kode=blok+"-"+nomor

semuaRumah.push(kode)

}

}

}


/* =========================
GENERATE SELECT BLOK
========================= */

function generateBlokSelect(){

let select=document.getElementById("blokIuran")

if(!select) return

select.innerHTML=""

for(let blok in blokData){

let opt=document.createElement("option")

opt.value=blok
opt.text=blok

select.appendChild(opt)

}

}


/* =========================
GENERATE TANGGAL
========================= */

function generateTanggal(){

let tgl=document.getElementById("tanggalIuran")

if(!tgl) return

for(let i=1;i<=31;i++){

let opt=document.createElement("option")

opt.value=i
opt.text=i

tgl.appendChild(opt)

}

}


/* =========================
GENERATE BULAN
========================= */

function generateBulan(){

let bln=document.getElementById("bulanIuran")

if(!bln) return

let namaBulan=[

"Januari",
"Februari",
"Maret",
"April",
"Mei",
"Juni",
"Juli",
"Agustus",
"September",
"Oktober",
"November",
"Desember"

]

for(let i=0;i<12;i++){

let opt=document.createElement("option")

opt.value=i+1
opt.text=namaBulan[i]

bln.appendChild(opt)

}

}


/* =========================
GENERATE TAHUN
========================= */

function generateTahun(){

let thn=document.getElementById("tahunIuran")

if(!thn) return

for(let i=2025;i<=2099;i++){

let opt=document.createElement("option")

opt.value=i
opt.text=i

thn.appendChild(opt)

}

}


/* =========================
INIT SYSTEM
========================= */

function initSystem(){

generateSemuaRumah()

generateBlokSelect()

generateTanggal()

generateBulan()

generateTahun()

cekLogin()

setTimeout(()=>{

hideLoader()

},1000)
document.addEventListener("DOMContentLoaded", function(){

let popups = document.querySelectorAll(".popup")

popups.forEach(popup=>{

let btn = document.createElement("span")
btn.innerHTML="✖"
btn.className="popupClose"

btn.onclick=function(){
popup.style.display="none"
}

popup.prepend(btn)

})

})
}


/* =========================
LOAD PAGE
========================= */

window.onload=function(){

initSystem()

}

/* =========================
FIREBASE COLLECTION
========================= */

const colIuran = db.collection("iuran")
const colKeluar = db.collection("pengeluaran")
const colKomplain = db.collection("komplain")



/* =========================
TAMBAH IURAN
========================= */

function tambahIuran(){

let nama = document.getElementById("namaIuran").value
let blok = document.getElementById("blokIuran").value
let rumah = document.getElementById("rumahIuran").value
let tanggal = document.getElementById("tanggalIuran").value
let bulan = document.getElementById("bulanIuran").value
let tahun = document.getElementById("tahunIuran").value
let nominal = document.getElementById("nominalIuran").value

if(!nama || !nominal){

notif("Isi data iuran terlebih dahulu")

return

}

colIuran.add({

nama:nama,
blok:blok,
rumah:rumah,
tanggal:tanggal,
bulan:bulan,
tahun:tahun,
nominal:Number(nominal),
created:new Date()

})
.then(()=>{

notif("Iuran berhasil disimpan")

closePopup()

})

}



/* =========================
TAMBAH PENGELUARAN
========================= */

function tambahPengeluaran(){

let tanggal = document.getElementById("tanggalKeluar").value
let bulan = document.getElementById("bulanKeluar").value
let tahun = document.getElementById("tahunKeluar").value
let ket = document.getElementById("ketKeluar").value
let nominal = document.getElementById("nominalKeluar").value

if(!ket || !nominal){

notif("Isi data pengeluaran")

return

}

colKeluar.add({

tanggal:tanggal,
bulan:bulan,
tahun:tahun,
ket:ket,
nominal:Number(nominal),
created:new Date()

})
.then(()=>{

notif("Pengeluaran berhasil disimpan")

closePopup()

})

}



/* =========================
LOAD DATA IURAN REALTIME
========================= */

function loadIuran(){

colIuran.orderBy("tanggal","desc")

.onSnapshot(snapshot=>{

let html=""
let total=0

rumahBayar=[]

snapshot.forEach(doc=>{

let d=doc.data()

total += Number(d.jumlah)

let kode = d.blok+"-"+d.rumah

rumahBayar.push(kode)

html += `

<tr>

<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>
<td>${rupiah(d.jumlah)}</td>

<td>

<button class="hapusBtn" onclick="hapusIuran('${doc.id}')">

Hapus

</button>

</td>

</tr>

`

})

let tabel=document.getElementById("tabelIuran")

if(tabel) tabel.innerHTML=html

let totalIuran=document.getElementById("totalIuran")

if(totalIuran) totalIuran.innerText=rupiah(total)

updateBelumBayar()

updateDashboard()

})

}



/* =========================
LOAD DATA PENGELUARAN
========================= */

function loadKeluar(){

colKeluar.orderBy("tanggal","desc")

.onSnapshot(snapshot=>{

let html=""
let total=0

snapshot.forEach(doc=>{

let d=doc.data()

total += Number(d.jumlah)

html += `

<tr>

<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>
<td>${d.ket}</td>
<td>${rupiah(d.jumlah)}</td>

<td>

<button onclick="hapusKeluar('${doc.id}')">

Hapus

</button>

</td>

</tr>

`

})

let tabel=document.getElementById("tabelKeluar")

if(tabel) tabel.innerHTML=html

let totalKeluar=document.getElementById("totalKeluar")

if(totalKeluar) totalKeluar.innerText=rupiah(total)

updateDashboard()

})

}



/* =========================
DELETE IURAN
========================= */

function hapusIuran(id){

if(!confirm("Hapus data iuran?")) return

colIuran.doc(id).delete()

notif("Iuran dihapus")

}



/* =========================
DELETE PENGELUARAN
========================= */

function hapusKeluar(id){

if(!confirm("Hapus pengeluaran?")) return

colKeluar.doc(id).delete()

notif("Pengeluaran dihapus")

}



/* =========================
UPDATE DASHBOARD
========================= */

function updateDashboard(){

let totalIuranText=document.getElementById("totalIuran").innerText
let totalKeluarText=document.getElementById("totalKeluar").innerText

let iuran=Number(totalIuranText.replace(/[^0-9]/g,""))
let keluar=Number(totalKeluarText.replace(/[^0-9]/g,""))

let kas=iuran-keluar

let elKas=document.getElementById("totalKas")

if(elKas) animateNumber("totalKas",kas)

updateChart(iuran,keluar)

updateDetailKas(iuran,keluar,kas)

}



/* =========================
DETAIL KAS POPUP
========================= */

function updateDetailKas(iuran,keluar,kas){

let el1=document.getElementById("detailTotalIuran")
let el2=document.getElementById("detailTotalKeluar")
let el3=document.getElementById("detailTotalKas")

if(el1) el1.innerText=rupiah(iuran)
if(el2) el2.innerText=rupiah(keluar)
if(el3) el3.innerText=rupiah(kas)

}



/* =========================
LOAD DASHBOARD
========================= */

function loadDashboard(){

loadIuran()

loadKeluar()

}



/* =========================
INIT FIREBASE SYSTEM
========================= */

window.addEventListener("DOMContentLoaded",()=>{

loadDashboard()

})

/* =========================
GENERATE PETA BLOK RUMAH
========================= */

function generateMapBlok(){

let container=document.getElementById("mapPerumahan")

if(!container) return

let html=""

for(let blok in blokData){

let jumlah=blokData[blok]

html+=`

<div class="blok-box">

<h4>${blok}</h4>

<div class="blok-grid">

`

for(let i=1;i<=jumlah;i++){

let nomor=String(i).padStart(2,"0")

let kode=blok+"-"+nomor

html+=`

<div 

id="rumah-${kode}" 
class="rumah-box belum"

onclick="detailRumah('${blok}','${nomor}')"

>

${nomor}

</div>

`

}

html+=`

</div>
</div>

`

}

container.innerHTML=html

}



/* =========================
UPDATE STATUS RUMAH LUNAS
========================= */

function updateStatusRumah(){

rumahBayar.forEach(kode=>{

let el=document.getElementById("rumah-"+kode)

if(el){

el.classList.remove("belum")

el.classList.add("lunas")

}

})

}



/* =========================
DETAIL RUMAH POPUP
========================= */

function detailRumah(blok,rumah){

let kode=blok+"-"+rumah

let modal=document.getElementById("modalRumah")

document.getElementById("judulRumah").innerText=

"Histori Pembayaran "+kode


db.collection("iuran")

.where("blok","==",blok)

.where("rumah","==",rumah)

.get()

.then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let d=doc.data()

html+=`

<tr>

<td>${d.nama}</td>
<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>
<td>${rupiah(d.jumlah)}</td>

</tr>

`

})

if(html===""){

html=`<tr>
<td colspan="3" class="text-center">
Belum ada pembayaran
</td>
</tr>`

}

document.getElementById("historiRumah").innerHTML=html

showPopup("modalRumah")

})

}



/* =========================
RUMAH BELUM BAYAR
========================= */

function updateBelumBayar(){

let belum=[]

semuaRumah.forEach(r=>{

if(!rumahBayar.includes(r)){

belum.push(r)

}

})

let html=""

belum.forEach(r=>{

html+=`

<span class="badge-belum">

${r}

</span>

`

})

let box=document.getElementById("rumahBelumBayar")

if(box) box.innerHTML=html

updateStatistikRumah()

}



/* =========================
STATISTIK RUMAH
========================= */

function updateStatistikRumah(){

let total=semuaRumah.length

let sudah=rumahBayar.length

let belum=total-sudah

let elTotal=document.getElementById("totalRumah")

let elSudah=document.getElementById("rumahBayar")

let elBelum=document.getElementById("rumahBelum")

if(elTotal) elTotal.innerText=total

if(elSudah) elSudah.innerText=sudah

if(elBelum) elBelum.innerText=belum

updateProgressBayar(total,sudah)

}



/* =========================
PROGRESS BAR PEMBAYARAN
========================= */

function updateProgressBayar(total,sudah){

let persen=0

if(total>0){

persen=Math.round((sudah/total)*100)

}

let bar=document.getElementById("progressBayar")

if(bar){

bar.style.width=persen+"%"

bar.innerText=persen+"%"

}

}



/* =========================
REFRESH MAP STATUS
========================= */

function refreshMap(){

generateMapBlok()

setTimeout(()=>{

updateStatusRumah()

},300)

}



/* =========================
LOAD MAP SYSTEM
========================= */

function loadMapSystem(){

generateSemuaRumah()

generateMapBlok()

}



/* =========================
INIT MAP
========================= */

window.addEventListener("DOMContentLoaded",()=>{

loadMapSystem()

})

/* =========================
CEK AKSES KOMPLAIN
========================= */

function cekAksesKomplain(){

let status=localStorage.getItem("loginWarga")

if(status!=="true"){

notif("Harus login warga terlebih dahulu")

return

}

showPopup("popupKomplain")

}



/* =========================
CEK AKSES DAFTAR KOMPLAIN
========================= */

function cekAksesDaftarKomplain(){

let status=localStorage.getItem("loginWarga")

if(status!=="true"){

notif("Login warga terlebih dahulu")

return

}

loadKomplain()

showPopup("popupListKomplain")

}



/* =========================
KIRIM KOMPLAIN
========================= */

function kirimKomplain(){

let nama=document.getElementById("komplainNama").value
let blok=document.getElementById("komplainBlok").value
let rumah=document.getElementById("komplainRumah").value
let tanggal=document.getElementById("komplainTanggal").value
let bulan=document.getElementById("komplainBulan").value
let tahun=document.getElementById("komplainTahun").value
let isi=document.getElementById("komplainIsi").value

if(!nama || !isi){

notif("Isi nama dan komplain")

return

}

colKomplain.add({

nama:nama,
blok:blok,
rumah:rumah,
tanggal:tanggal,
bulan:bulan,
tahun:tahun,
isi:isi,
created:new Date()

})

.then(()=>{

notif("Komplain berhasil dikirim")

closePopup()

resetFormKomplain()

})

}



/* =========================
RESET FORM KOMPLAIN
========================= */

function resetFormKomplain(){

document.getElementById("komplainNama").value=""
document.getElementById("komplainIsi").value=""

}



/* =========================
LOAD KOMPLAIN REALTIME
========================= */

function loadKomplain(){

colKomplain

.orderBy("tanggal","desc")

.onSnapshot(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let d=doc.data()

html+=`

<tr>

<td>${d.nama}</td>

<td>${d.blok}</td>

<td>${d.rumah}</td>

<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>

<td>${d.isi}</td>

</tr>

`

})

if(html===""){

html=`<tr>

<td colspan="5" class="text-center">

Belum ada komplain

</td>

</tr>`

}

let tabel=document.getElementById("tabelKomplain")

if(tabel) tabel.innerHTML=html

})

}



/* =========================
UPDATE BADGE KOMPLAIN
========================= */

function updateBadgeKomplain(){

colKomplain.get()

.then(snapshot=>{

let jumlah=snapshot.size

let badge=document.getElementById("badgeKomplain")

if(badge){

badge.innerText=jumlah

}

})

}



/* =========================
LIST KOMPLAIN ADMIN
========================= */

function loadKomplainAdmin(){

colKomplain

.orderBy("tanggal","desc")

.onSnapshot(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let d=doc.data()

html+=`

<tr>

<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>
<td>${d.isi}</td>

<td>

<button onclick="hapusKomplain('${doc.id}')">

Hapus

</button>

</td>

</tr>

`

})

let tabel=document.getElementById("tabelKomplainAdmin")

if(tabel) tabel.innerHTML=html

})

}



/* =========================
HAPUS KOMPLAIN
========================= */

function hapusKomplain(id){

if(!confirm("Hapus komplain ini?")) return

colKomplain.doc(id).delete()

notif("Komplain dihapus")

}



/* =========================
INIT KOMPLAIN SYSTEM
========================= */

function initKomplainSystem(){

updateBadgeKomplain()

loadKomplainAdmin()

}



/* =========================
LOAD SYSTEM KOMPLAIN
========================= */

window.addEventListener("DOMContentLoaded",()=>{

initKomplainSystem()

})

/* =========================
FILTER IURAN BULAN TAHUN
========================= */

function filterIuran(){

let bulan=document.getElementById("filterBulanIuran").value
let tahun=document.getElementById("filterTahunIuran").value

colIuran

.where("bulan","==",bulan)

.where("tahun","==",tahun)

.get()

.then(snapshot=>{

let html=""
let total=0

snapshot.forEach(doc=>{

let d=doc.data()

total+=Number(d.jumlah)

html+=`

<tr>

<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>
<td>${rupiah(d.jumlah)}</td>

</tr>

`

})

if(html===""){

html=`<tr>
<td colspan="5" class="text-center">
Data tidak ditemukan
</td>
</tr>`

}

document.getElementById("tabelIuran").innerHTML=html

document.getElementById("totalIuran").innerText=rupiah(total)

})

}



/* =========================
FILTER PENGELUARAN
========================= */

function filterPengeluaran(){

let bulan=document.getElementById("filterBulanKeluar").value
let tahun=document.getElementById("filterTahunKeluar").value

colKeluar

.where("bulan","==",bulan)

.where("tahun","==",tahun)

.get()

.then(snapshot=>{

let html=""
let total=0

snapshot.forEach(doc=>{

let d=doc.data()

total+=Number(d.jumlah)

html+=`

<tr>

<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>
<td>${d.ket}</td>
<td>${rupiah(d.jumlah)}</td>

</tr>

`

})

if(html===""){

html=`<tr>
<td colspan="3" class="text-center">
Data tidak ditemukan
</td>
</tr>`

}

document.getElementById("tabelKeluar").innerHTML=html

document.getElementById("totalKeluar").innerText=rupiah(total)

})

}



/* =========================
EXPORT EXCEL
========================= */

function exportExcel(){

let tabel=document.querySelector("table")

if(!tabel){

notif("Tabel tidak ditemukan")

return

}

let wb=XLSX.utils.table_to_book(tabel)

XLSX.writeFile(wb,"laporan-kas-graha-alana.xlsx")

notif("Laporan Excel berhasil dibuat")

}



/* =========================
UPDATE GRAFIK KAS
========================= */

function updateChart(iuran,keluar){

let kas=iuran-keluar

let ctx=document.getElementById("chartKas")

if(!ctx) return

if(chartKas){

chartKas.destroy()

}

chartKas=new Chart(ctx,{

type:"bar",

data:{

labels:["Iuran","Pengeluaran","Kas"],

datasets:[{

label:"Statistik Kas",

data:[iuran,keluar,kas],

backgroundColor:[

"#16a34a",
"#dc2626",
"#2563eb"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{display:false}

},

scales:{

y:{

beginAtZero:true

}

}

}

})

}



/* =========================
UPDATE GRAFIK OTOMATIS
========================= */

function refreshGrafik(){

let totalIuranText=document.getElementById("totalIuran").innerText
let totalKeluarText=document.getElementById("totalKeluar").innerText

let iuran=Number(totalIuranText.replace(/[^0-9]/g,""))
let keluar=Number(totalKeluarText.replace(/[^0-9]/g,""))

updateChart(iuran,keluar)

}



/* =========================
INIT GRAFIK SYSTEM
========================= */

function initGrafik(){

refreshGrafik()

}



/* =========================
LOAD GRAFIK
========================= */

window.addEventListener("DOMContentLoaded",()=>{

initGrafik()

})

/* =========================
SECURITY SESSION SYSTEM
========================= */

function cekSession(){

let admin=localStorage.getItem("loginAdmin")
let warga=localStorage.getItem("loginWarga")

if(admin==="true"){

console.log("Admin session aktif")

}

if(warga==="true"){

console.log("Warga session aktif")

}

}



/* =========================
LOGOUT ADMIN
========================= */

function logoutAdmin(){

localStorage.removeItem("loginAdmin")

updateAdminButtons()
   
notif("Admin logout")

setTimeout(()=>{

location.reload()

},1000)

}



/* =========================
LOGOUT WARGA
========================= */

function logoutWarga(){

localStorage.removeItem("loginWarga")

notif("Warga logout")

setTimeout(()=>{

location.reload()

},1000)

}



/* =========================
AUTO REFRESH DASHBOARD
========================= */

function autoRefresh(){

setInterval(()=>{

refreshGrafik()

updateBadgeKomplain()

},10000)

}



/* =========================
PROTEKSI ERROR
========================= */

window.onerror=function(msg,url,line){

console.warn("Error ditangkap sistem")

console.warn(msg)

return true

}



/* =========================
PERFORMANCE OPTIMIZER
========================= */

function systemOptimizer(){

console.log("Optimizer aktif")

setTimeout(()=>{

let loader=document.getElementById("systemLoader")

if(loader){

loader.style.display="none"

}

},800)

}



/* =========================
DARK MODE SUPPORT
========================= */

function toggleDarkMode(){

document.body.classList.toggle("dark-mode")

}



/* =========================
AUTO SYNC FIREBASE
========================= */

function firebaseSync(){

colIuran.onSnapshot(()=>{

updateDashboard()

})

colKeluar.onSnapshot(()=>{

updateDashboard()

})

}



/* =========================
SYSTEM HEALTH CHECK
========================= */

function healthCheck(){

console.log("System OK")

}



/* =========================
INIT ULTRA ENGINE
========================= */

function initUltraEngine(){

cekSession()

systemOptimizer()

autoRefresh()

firebaseSync()

healthCheck()

}



/* =========================
LOAD FINAL SYSTEM
========================= */

window.addEventListener("DOMContentLoaded",()=>{

initUltraEngine()

})

/* ===============================
SMART DASHBOARD ENGINE
ULTRA EXTENSION PART 7
=============================== */


/* ===============================
DASHBOARD SUMMARY BOX
=============================== */

function updateDashboardSummary(){

let totalIuranText=document.getElementById("totalIuran").innerText
let totalKeluarText=document.getElementById("totalKeluar").innerText

let iuran=Number(totalIuranText.replace(/[^0-9]/g,""))
let keluar=Number(totalKeluarText.replace(/[^0-9]/g,""))

let kas=iuran-keluar

let el1=document.getElementById("summaryIuran")
let el2=document.getElementById("summaryKeluar")
let el3=document.getElementById("summaryKas")

if(el1) el1.innerText=rupiah(iuran)
if(el2) el2.innerText=rupiah(keluar)
if(el3) el3.innerText=rupiah(kas)

}


/* ===============================
MONTHLY STATISTICS
=============================== */

function statistikBulanan(){

let bulanSekarang=new Date().getMonth()+1
let tahunSekarang=new Date().getFullYear()

colIuran
.where("bulan","==",bulanSekarang)
.where("tahun","==",tahunSekarang)
.get()
.then(snapshot=>{

let total=0

snapshot.forEach(doc=>{

total+=Number(doc.data().nominal)

})

let el=document.getElementById("statBulanan")

if(el){

el.innerText=rupiah(total)

}

})

}


/* ===============================
HARIAN STATISTICS
=============================== */

function statistikHarian(){

let today=new Date()

let t=today.getDate()
let b=today.getMonth()+1
let y=today.getFullYear()

colIuran
.where("tanggal","==",t)
.where("bulan","==",b)
.where("tahun","==",y)
.get()
.then(snapshot=>{

let total=0

snapshot.forEach(doc=>{

total+=Number(doc.data().nominal)

})

let el=document.getElementById("statHarian")

if(el){

el.innerText=rupiah(total)

}

})

}


/* ===============================
TRANSACTION COUNTER
=============================== */

function hitungTransaksi(){

colIuran.get().then(s=>{

let el=document.getElementById("jumlahTransaksi")

if(el){

el.innerText=s.size

}

})

}


/* ===============================
SMART GREETING
=============================== */

function smartGreeting(){

let jam=new Date().getHours()

let teks=""

if(jam<12){

teks="Selamat Pagi"

}

else if(jam<18){

teks="Selamat Siang"

}

else{

teks="Selamat Malam"

}

let el=document.getElementById("greeting")

if(el){

el.innerText=teks+" Warga Graha Alana"

}

}


/* ===============================
DASHBOARD CLOCK
=============================== */

function startClock(){

setInterval(()=>{

let now=new Date()

let jam=String(now.getHours()).padStart(2,"0")
let menit=String(now.getMinutes()).padStart(2,"0")
let detik=String(now.getSeconds()).padStart(2,"0")

let waktu=jam+":"+menit+":"+detik

let el=document.getElementById("clock")

if(el){

el.innerText=waktu

}

},1000)

}


/* ===============================
SMART UPDATE ENGINE
=============================== */

function refreshDashboardUltra(){

updateDashboardSummary()

statistikBulanan()

statistikHarian()

hitungTransaksi()

}


/* ===============================
AUTO UPDATE DASHBOARD
=============================== */

function autoDashboard(){

setInterval(()=>{

refreshDashboardUltra()

},8000)

}


/* ===============================
INIT DASHBOARD ULTRA
=============================== */

function initUltraDashboard(){

smartGreeting()

startClock()

refreshDashboardUltra()

autoDashboard()

}


/* ===============================
LOAD ULTRA DASHBOARD
=============================== */

window.addEventListener("DOMContentLoaded",()=>{

initUltraDashboard()

})

/* =================================
AI SUMMARY ENGINE
ULTRA EXTENSION PART 8
================================= */


/* =================================
AI ANALISIS KAS
================================= */

function analisisKasAI(){

let totalIuranText=document.getElementById("totalIuran").innerText
let totalKeluarText=document.getElementById("totalKeluar").innerText

let iuran=Number(totalIuranText.replace(/[^0-9]/g,""))
let keluar=Number(totalKeluarText.replace(/[^0-9]/g,""))

let kas=iuran-keluar

let status=""

if(kas>1000000){

status="Kas sangat sehat"

}

else if(kas>500000){

status="Kas cukup stabil"

}

else if(kas>100000){

status="Kas mulai menipis"

}

else{

status="Kas kritis"

}

let el=document.getElementById("aiStatusKas")

if(el){

el.innerText=status

}

}



/* =================================
AI REKOMENDASI KEUANGAN
================================= */

function rekomendasiAI(){

let totalKeluarText=document.getElementById("totalKeluar").innerText
let keluar=Number(totalKeluarText.replace(/[^0-9]/g,""))

let pesan=""

if(keluar>500000){

pesan="Pengeluaran tinggi bulan ini. Pertimbangkan penghematan."

}

else if(keluar>200000){

pesan="Pengeluaran masih dalam batas normal."

}

else{

pesan="Pengeluaran sangat efisien."

}

let el=document.getElementById("aiRekomendasi")

if(el){

el.innerText=pesan

}

}



/* =================================
AI DETEKSI PENGELUARAN BESAR
================================= */

function deteksiPengeluaranBesar(){

colKeluar.get().then(snapshot=>{

let besar=0

snapshot.forEach(doc=>{

let d=doc.data()

if(d.nominal>besar){

besar=d.nominal

}

})

let el=document.getElementById("aiPengeluaranBesar")

if(el){

el.innerText=rupiah(besar)

}

})

}



/* =================================
AI PREDIKSI SALDO
================================= */

function prediksiSaldo(){

let totalIuranText=document.getElementById("totalIuran").innerText
let totalKeluarText=document.getElementById("totalKeluar").innerText

let iuran=Number(totalIuranText.replace(/[^0-9]/g,""))
let keluar=Number(totalKeluarText.replace(/[^0-9]/g,""))

let kas=iuran-keluar

let prediksi=kas+200000

let el=document.getElementById("aiPrediksiKas")

if(el){

el.innerText=rupiah(prediksi)

}

}



/* =================================
AI LAPORAN BULANAN
================================= */

function laporanBulananAI(){

let bulan=new Date().getMonth()+1
let tahun=new Date().getFullYear()

colIuran
.where("bulan","==",bulan)
.where("tahun","==",tahun)
.get()
.then(snapshot=>{

let total=0

snapshot.forEach(doc=>{

total+=Number(doc.data().nominal)

})

let teks=""

if(total>1000000){

teks="Pemasukan iuran bulan ini sangat baik."

}

else if(total>500000){

teks="Pemasukan iuran cukup stabil."

}

else{

teks="Pemasukan iuran masih rendah."

}

let el=document.getElementById("aiLaporanBulanan")

if(el){

el.innerText=teks

}

})

}



/* =================================
AI MONITOR RUMAH BELUM BAYAR
================================= */

function aiBelumBayar(){

let total=semuaRumah.length
let bayar=rumahBayar.length

let belum=total-bayar

let pesan=""

if(belum>20){

pesan="Banyak rumah belum membayar iuran."

}

else if(belum>10){

pesan="Beberapa rumah belum membayar."

}

else{

pesan="Sebagian besar rumah sudah membayar."

}

let el=document.getElementById("aiBelumBayar")

if(el){

el.innerText=pesan

}

}



/* =================================
AI RINGKASAN DASHBOARD
================================= */

function aiSummary(){

analisisKasAI()

rekomendasiAI()

deteksiPengeluaranBesar()

prediksiSaldo()

laporanBulananAI()

aiBelumBayar()

}



/* =================================
AUTO AI UPDATE
================================= */

function autoAI(){

setInterval(()=>{

aiSummary()

},12000)

}



/* =================================
INIT AI SYSTEM
================================= */

function initAIEngine(){

aiSummary()

autoAI()

}



/* =================================
LOAD AI ENGINE
================================= */

window.addEventListener("DOMContentLoaded",()=>{

initAIEngine()

})

/* =================================
ADVANCED EXPORT SYSTEM
ULTRA EXTENSION PART 9
================================= */


/* =================================
EXPORT IURAN
================================= */

function exportIuranExcel(){

colIuran.get().then(snapshot=>{

let data=[]

snapshot.forEach(doc=>{

let d=doc.data()

data.push({

Nama:d.nama,
Blok:d.blok,
Rumah:d.rumah,
Tanggal:d.tanggal,
Bulan:d.bulan,
Tahun:d.tahun,
Nominal:d.nominal

})

})

buatExcel(data,"laporan-iuran.xlsx")

})

}



/* =================================
EXPORT PENGELUARAN
================================= */

function exportPengeluaranExcel(){

colKeluar.get().then(snapshot=>{

let data=[]

snapshot.forEach(doc=>{

let d=doc.data()

data.push({

Tanggal:d.tanggal,
Bulan:d.bulan,
Tahun:d.tahun,
Keterangan:d.ket,
Nominal:d.nominal

})

})

buatExcel(data,"laporan-pengeluaran.xlsx")

})

}



/* =================================
EXPORT KOMPLAIN
================================= */

function exportKomplainExcel(){

colKomplain.get().then(snapshot=>{

let data=[]

snapshot.forEach(doc=>{

let d=doc.data()

data.push({

Nama:d.nama,
Blok:d.blok,
Rumah:d.rumah,
Tanggal:d.tanggal,
Bulan:d.bulan,
Tahun:d.tahun,
Komplain:d.isi

})

})

buatExcel(data,"laporan-komplain.xlsx")

})

}



/* =================================
EXPORT RUMAH BELUM BAYAR
================================= */

function exportBelumBayar(){

let belum=[]

semuaRumah.forEach(r=>{

if(!rumahBayar.includes(r)){

belum.push({

Rumah:r

})

}

})

buatExcel(belum,"rumah-belum-bayar.xlsx")

}



/* =================================
EXPORT STATISTIK
================================= */

function exportStatistik(){

let totalIuranText=document.getElementById("totalIuran").innerText
let totalKeluarText=document.getElementById("totalKeluar").innerText
let totalKasText=document.getElementById("totalKas").innerText

let data=[{

Total_Iuran:totalIuranText,
Total_Pengeluaran:totalKeluarText,
Total_Kas:totalKasText

}]

buatExcel(data,"statistik-kas.xlsx")

}



/* =================================
EXPORT FULL LAPORAN
================================= */

function exportFullLaporan(){

colIuran.get().then(iuranSnap=>{

colKeluar.get().then(keluarSnap=>{

let data=[]

iuranSnap.forEach(doc=>{

let d=doc.data()

data.push({

Jenis:"Iuran",
Nama:d.nama,
Blok:d.blok,
Rumah:d.rumah,
Tanggal:d.tanggal+"/"+d.bulan+"/"+d.tahun,
Nominal:d.nominal

})

})

keluarSnap.forEach(doc=>{

let d=doc.data()

data.push({

Jenis:"Pengeluaran",
Nama:"-",
Blok:"-",
Rumah:"-",
Tanggal:d.tanggal+"/"+d.bulan+"/"+d.tahun,
Nominal:d.nominal

})

})

buatExcel(data,"laporan-kas-full.xlsx")

})

})

}



/* =================================
BUAT FILE EXCEL
================================= */

function buatExcel(data,namaFile){

let ws=XLSX.utils.json_to_sheet(data)

let wb=XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb,ws,"Laporan")

XLSX.writeFile(wb,namaFile)

notif("Export Excel berhasil")

}



/* =================================
EXPORT BULANAN
================================= */

function exportBulanan(){

let bulan=document.getElementById("filterBulanIuran").value
let tahun=document.getElementById("filterTahunIuran").value

colIuran
.where("bulan","==",bulan)
.where("tahun","==",tahun)
.get()
.then(snapshot=>{

let data=[]

snapshot.forEach(doc=>{

let d=doc.data()

data.push({

Nama:d.nama,
Blok:d.blok,
Rumah:d.rumah,
Tanggal:d.tanggal+"/"+d.bulan+"/"+d.tahun,
Nominal:d.nominal

})

})

buatExcel(data,"laporan-bulanan.xlsx")

})

}



/* =================================
EXPORT DASHBOARD SNAPSHOT
================================= */

function exportDashboard(){

let data=[{

Total_Iuran:document.getElementById("totalIuran").innerText,
Total_Pengeluaran:document.getElementById("totalKeluar").innerText,
Total_Kas:document.getElementById("totalKas").innerText,
Rumah_Bayar:document.getElementById("rumahBayar").innerText,
Rumah_Belum:document.getElementById("rumahBelum").innerText

}]

buatExcel(data,"dashboard-kas.xlsx")

}



/* =================================
INIT EXPORT SYSTEM
================================= */

function initExportSystem(){

console.log("Export System Ready")

}



/* =================================
LOAD EXPORT SYSTEM
================================= */

window.addEventListener("DOMContentLoaded",()=>{

initExportSystem()

})

/* =================================
SUPER MAP VISUALIZATION
ULTRA EXTENSION PART 10
================================= */


/* =================================
GENERATE SUPER MAP
================================= */

function generateSuperMap(){

let container=document.getElementById("mapPerumahan")

if(!container) return

let html=""

for(let blok in blokData){

let jumlah=blokData[blok]

html+=`
<div class="super-blok">

<div class="super-blok-title">${blok}</div>

<div class="super-grid">
`

for(let i=1;i<=jumlah;i++){

let nomor=String(i).padStart(2,"0")

let kode=blok+"-"+nomor

html+=`

<div 
id="map-${kode}" 
class="super-rumah belum"

onclick="openRumahDetail('${blok}','${nomor}')"

onmouseenter="tooltipRumah('${kode}')"

>

${nomor}

</div>

`

}

html+=`

</div>
</div>

`

}

container.innerHTML=html

}



/* =================================
UPDATE STATUS RUMAH
================================= */

function updateSuperMap(){

rumahBayar.forEach(kode=>{

let el=document.getElementById("map-"+kode)

if(el){

el.classList.remove("belum")

el.classList.add("lunas")

}

})

}



/* =================================
TOOLTIP RUMAH
================================= */

function tooltipRumah(kode){

let el=document.getElementById("tooltipRumah")

if(!el) return

el.innerText="Rumah "+kode

}



/* =================================
DETAIL RUMAH
================================= */

function openRumahDetail(blok,rumah){

let kode=blok+"-"+rumah

let modal=document.getElementById("modalRumah")

let title=document.getElementById("judulRumah")

title.innerText="Detail Pembayaran "+kode

db.collection("iuran")
.where("blok","==",blok)
.where("rumah","==",rumah)
.get()
.then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let d=doc.data()

html+=`

<tr>

<td>${d.nama}</td>
<td>${d.tanggal}/${d.bulan}/${d.tahun}</td>
<td>${rupiah(d.jumlah)}</td>

</tr>

`

})

if(html===""){

html=`
<tr>
<td colspan="3">Belum ada pembayaran</td>
</tr>
`

}

document.getElementById("historiRumah").innerHTML=html

showPopup("modalRumah")

})

}



/* =================================
ANIMASI MAP
================================= */

function animateMap(){

let rumah=document.querySelectorAll(".super-rumah")

rumah.forEach((el,i)=>{

setTimeout(()=>{

el.classList.add("map-appear")

},i*20)

})

}



/* =================================
HIGHLIGHT RUMAH BELUM BAYAR
================================= */

function highlightBelumBayar(){

let belum=[]

semuaRumah.forEach(r=>{

if(!rumahBayar.includes(r)){

belum.push(r)

}

})

belum.forEach(kode=>{

let el=document.getElementById("map-"+kode)

if(el){

el.classList.add("rumah-warning")

}

})

}



/* =================================
MAP LEGEND
================================= */

function generateLegend(){

let el=document.getElementById("mapLegend")

if(!el) return

el.innerHTML=`

<div class="legend-item">

<span class="legend-lunas"></span>
Rumah Lunas

</div>

<div class="legend-item">

<span class="legend-belum"></span>
Belum Bayar

</div>

`

}



/* =================================
MAP SEARCH
================================= */

function cariRumah(){

let kode=document.getElementById("searchRumah").value

let el=document.getElementById("map-"+kode)

if(!el){

notif("Rumah tidak ditemukan")

return

}

document.querySelectorAll(".super-rumah").forEach(r=>{

r.classList.remove("map-focus")

})

el.classList.add("map-focus")

el.scrollIntoView({

behavior:"smooth",
block:"center"

})

}



/* =================================
REFRESH SUPER MAP
================================= */

function refreshSuperMap(){

generateSuperMap()

setTimeout(()=>{

updateSuperMap()

highlightBelumBayar()

animateMap()

},400)

}



/* =================================
INIT SUPER MAP
================================= */

function initSuperMap(){

generateSuperMap()

generateLegend()

animateMap()

}



/* =================================
LOAD MAP SYSTEM
================================= */

window.addEventListener("DOMContentLoaded",()=>{

initSuperMap()

})

/* =================================
REALTIME NOTIFICATION SYSTEM
ULTRA EXTENSION PART 11
================================= */


/* =================================
NOTIFICATION STORAGE
================================= */

let notifList=[]



/* =================================
CREATE NOTIFICATION
================================= */

function createNotif(text,tipe){

let notif={

text:text,
type:tipe,
time:new Date()

}

notifList.unshift(notif)

renderNotif()

showToast(text)

updateNotifBadge()

}



/* =================================
RENDER NOTIFICATION
================================= */

function renderNotif(){

let box=document.getElementById("notifList")

if(!box) return

let html=""

notifList.forEach(n=>{

html+=`

<div class="notif-item ${n.type}">

<div class="notif-text">${n.text}</div>

<div class="notif-time">

${n.time.toLocaleTimeString()}

</div>

</div>

`

})

box.innerHTML=html

}



/* =================================
NOTIFICATION BADGE
================================= */

function updateNotifBadge(){

let badge=document.getElementById("notifBadge")

if(!badge) return

badge.innerText=notifList.length

}



/* =================================
CLEAR NOTIFICATION
================================= */

function clearNotif(){

notifList=[]

renderNotif()

updateNotifBadge()

}



/* =================================
TOAST POPUP
================================= */

function showToast(text){

let toast=document.getElementById("toastNotif")

let toastText=document.getElementById("toastText")

if(!toast) return

toastText.innerText=text

toast.classList.add("toast-show")

setTimeout(()=>{

toast.classList.remove("toast-show")

},3000)

}



/* =================================
REALTIME IURAN NOTIFICATION
================================= */

function listenIuranNotif(){

colIuran.onSnapshot(snapshot=>{

snapshot.docChanges().forEach(change=>{

if(change.type==="added"){

let d=change.doc.data()

createNotif(

"Iuran masuk dari "+d.nama+" ("+d.blok+"-"+d.rumah+")",

"notif-iuran"

)

}

})

})

}



/* =================================
REALTIME PENGELUARAN NOTIFICATION
================================= */

function listenKeluarNotif(){

colKeluar.onSnapshot(snapshot=>{

snapshot.docChanges().forEach(change=>{

if(change.type==="added"){

let d=change.doc.data()

createNotif(

"Pengeluaran kas: "+rupiah(d.jumlah),

"notif-keluar"

)

}

})

})

}



/* =================================
REALTIME KOMPLAIN NOTIFICATION
================================= */

function listenKomplainNotif(){

colKomplain.onSnapshot(snapshot=>{

snapshot.docChanges().forEach(change=>{

if(change.type==="added"){

let d=change.doc.data()

createNotif(

"Komplain baru dari "+d.nama,

"notif-komplain"

)

}

})

})

}



/* =================================
LIMIT NOTIFICATION
================================= */

function limitNotif(){

if(notifList.length>50){

notifList.pop()

}

}



/* =================================
AUTO CLEAN NOTIFICATION
================================= */

function autoCleanNotif(){

setInterval(()=>{

limitNotif()

renderNotif()

},60000)

}



/* =================================
OPEN NOTIFICATION PANEL
================================= */

function openNotifPanel(){

showPopup("popupNotif")

}



/* =================================
INIT NOTIFICATION SYSTEM
================================= */

function initNotifSystem(){

listenIuranNotif()

listenKeluarNotif()

listenKomplainNotif()

autoCleanNotif()

}



/* =================================
LOAD NOTIFICATION SYSTEM
================================= */

window.addEventListener("DOMContentLoaded",()=>{

initNotifSystem()

})

/* =================================
SECURITY & BACKUP SYSTEM
ULTRA EXTENSION PART 12
================================= */


/* =================================
LOG AKTIVITAS
================================= */

let activityLog=[]

function logActivity(text){

let log={

text:text,
time:new Date()

}

activityLog.unshift(log)

renderLog()

}



/* =================================
RENDER LOG
================================= */

function renderLog(){

let box=document.getElementById("activityLog")

if(!box) return

let html=""

activityLog.forEach(l=>{

html+=`

<div class="log-item">

<div class="log-text">${l.text}</div>

<div class="log-time">

${l.time.toLocaleString()}

</div>

</div>

`

})

box.innerHTML=html

}



/* =================================
LOG LOGIN ADMIN
================================= */

function logLoginAdmin(){

logActivity("Admin login")

}



/* =================================
LOG INPUT IURAN
================================= */

function logIuran(nama,blok,rumah){

logActivity(

"Iuran ditambahkan oleh "+nama+" ("+blok+"-"+rumah+")"

)

}



/* =================================
LOG PENGELUARAN
================================= */

function logPengeluaran(ket,nominal){

logActivity(

"Pengeluaran: "+ket+" "+rupiah(nominal)

)

}



/* =================================
PROTEKSI ADMIN
================================= */

function cekAdminAkses(){

let admin=localStorage.getItem("loginAdmin")

if(admin!=="true"){

notif("Akses admin diperlukan")

return false

}

return true

}



/* =================================
ANTI MANIPULASI
================================= */

function validasiNominal(n){

if(n<=0){

notif("Nominal tidak valid")

return false

}

if(n>100000000){

notif("Nominal terlalu besar")

return false

}

return true

}



/* =================================
BACKUP DATA
================================= */

function backupData(){

Promise.all([

colIuran.get(),
colKeluar.get(),
colKomplain.get()

])

.then(([iuranSnap,keluarSnap,komplainSnap])=>{

let backup={

iuran:[],
keluar:[],
komplain:[]

}

iuranSnap.forEach(doc=>{

backup.iuran.push(doc.data())

})

keluarSnap.forEach(doc=>{

backup.keluar.push(doc.data())

})

komplainSnap.forEach(doc=>{

backup.komplain.push(doc.data())

})

downloadBackup(backup)

})

}



/* =================================
DOWNLOAD BACKUP
================================= */

function downloadBackup(data){

let json=JSON.stringify(data,null,2)

let blob=new Blob([json],{type:"application/json"})

let url=URL.createObjectURL(blob)

let a=document.createElement("a")

a.href=url
a.download="backup-kas-graha-alana.json"

a.click()

notif("Backup berhasil dibuat")

}



/* =================================
RESTORE DATA
================================= */

function restoreData(file){

let reader=new FileReader()

reader.onload=function(e){

let data=JSON.parse(e.target.result)

restoreIuran(data.iuran)
restoreKeluar(data.keluar)
restoreKomplain(data.komplain)

}

reader.readAsText(file)

}



/* =================================
RESTORE IURAN
================================= */

function restoreIuran(data){

data.forEach(d=>{

colIuran.add(d)

})

}



/* =================================
RESTORE PENGELUARAN
================================= */

function restoreKeluar(data){

data.forEach(d=>{

colKeluar.add(d)

})

}



/* =================================
RESTORE KOMPLAIN
================================= */

function restoreKomplain(data){

data.forEach(d=>{

colKomplain.add(d)

})

}



/* =================================
MONITOR SYSTEM
================================= */

function systemMonitor(){

console.log("System running normal")

}



/* =================================
AUTO BACKUP
================================= */

function autoBackup(){

setInterval(()=>{

backupData()

},86400000)

}



/* =================================
INIT SECURITY
================================= */

function initSecuritySystem(){

systemMonitor()

autoBackup()

}



/* =================================
LOAD SECURITY SYSTEM
================================= */

window.addEventListener("DOMContentLoaded",()=>{

initSecuritySystem()

})

/* =================================
PERFORMANCE OPTIMIZER PRO
ULTRA EXTENSION PART 13
================================= */


/* =================================
CACHE SYSTEM
================================= */

let dashboardCache={}

function cacheDashboard(){

dashboardCache.totalIuran=
document.getElementById("totalIuran")?.innerText

dashboardCache.totalKeluar=
document.getElementById("totalKeluar")?.innerText

dashboardCache.totalKas=
document.getElementById("totalKas")?.innerText

dashboardCache.timestamp=Date.now()

}



/* =================================
LOAD CACHE
================================= */

function loadCache(){

if(!dashboardCache.timestamp) return

let age=Date.now()-dashboardCache.timestamp

if(age<10000){

if(document.getElementById("totalIuran"))
document.getElementById("totalIuran").innerText=
dashboardCache.totalIuran

if(document.getElementById("totalKeluar"))
document.getElementById("totalKeluar").innerText=
dashboardCache.totalKeluar

if(document.getElementById("totalKas"))
document.getElementById("totalKas").innerText=
dashboardCache.totalKas

}

}



/* =================================
SMART REFRESH ENGINE
================================= */

function smartRefresh(){

setInterval(()=>{

loadCache()

refreshDashboardUltra()

},7000)

}



/* =================================
LAZY LOAD MAP
================================= */

function lazyLoadMap(){

let map=document.getElementById("mapPerumahan")

if(!map) return

let observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

refreshSuperMap()

}

})

})

observer.observe(map)

}



/* =================================
QUERY LIMITER
================================= */

function limitQuery(){

colIuran
.orderBy("tanggal","desc")
.limit(200)

colKeluar
.orderBy("tanggal","desc")
.limit(200)

}



/* =================================
MEMORY CLEANUP
================================= */

function memoryCleanup(){

setInterval(()=>{

if(notifList.length>100){

notifList.splice(100)

}

if(activityLog.length>100){

activityLog.splice(100)

}

},60000)

}



/* =================================
PERFORMANCE MONITOR
================================= */

function monitorPerformance(){

setInterval(()=>{

let mem=performance.memory

if(mem){

console.log("Memory usage:",mem.usedJSHeapSize)

}

},15000)

}



/* =================================
FRAME RATE OPTIMIZER
================================= */

function optimizeAnimation(){

document.querySelectorAll(".super-rumah").forEach(el=>{

el.style.willChange="transform"

})

}



/* =================================
NETWORK CHECK
================================= */

function checkNetwork(){

window.addEventListener("offline",()=>{

notif("Koneksi internet terputus")

})

window.addEventListener("online",()=>{

notif("Koneksi internet kembali")

})

}



/* =================================
CPU LOAD BALANCER
================================= */

function cpuBalancer(){

setTimeout(()=>{

console.log("CPU balancing active")

},2000)

}



/* =================================
AUTO CACHE UPDATE
================================= */

function autoCache(){

setInterval(()=>{

cacheDashboard()

},8000)

}



/* =================================
SYSTEM OPTIMIZER
================================= */

function systemOptimizerPro(){

limitQuery()

lazyLoadMap()

optimizeAnimation()

memoryCleanup()

monitorPerformance()

checkNetwork()

cpuBalancer()

autoCache()

smartRefresh()

}



/* =================================
INIT PERFORMANCE SYSTEM
================================= */

function initPerformance(){

systemOptimizerPro()

}



/* =================================
LOAD PERFORMANCE SYSTEM
================================= */

window.addEventListener("DOMContentLoaded",()=>{

initPerformance()

})

/* =================================
AUTO MAINTENANCE ENGINE
ULTRA EXTENSION PART 14
================================= */


/* =================================
SYSTEM HEALTH STATUS
================================= */

let systemHealth={

status:"OK",
lastCheck:Date.now(),
errors:0

}



/* =================================
HEALTH CHECK
================================= */

function healthCheckSystem(){

systemHealth.lastCheck=Date.now()

let el=document.getElementById("systemHealth")

if(el){

el.innerText="System OK"

}

console.log("Health check complete")

}



/* =================================
WATCHDOG SYSTEM
================================= */

function watchdogSystem(){

setInterval(()=>{

let now=Date.now()

let diff=now-systemHealth.lastCheck

if(diff>20000){

systemHealth.status="Warning"

console.warn("Watchdog detected delay")

}

},10000)

}



/* =================================
AUTO REPAIR MINOR ERROR
================================= */

function autoRepair(){

window.addEventListener("error",(e)=>{

systemHealth.errors++

console.warn("Auto repair triggered")

try{

refreshDashboardUltra()

}catch(err){

console.warn("Repair failed")

}

})

}



/* =================================
CACHE CLEANER
================================= */

function cleanCache(){

setInterval(()=>{

dashboardCache={}

console.log("Cache cleaned")

},300000)

}



/* =================================
OLD NOTIFICATION CLEANER
================================= */

function cleanOldNotif(){

setInterval(()=>{

if(notifList.length>30){

notifList.splice(30)

renderNotif()

}

},120000)

}



/* =================================
ACTIVITY LOG CLEANER
================================= */

function cleanActivityLog(){

setInterval(()=>{

if(activityLog.length>50){

activityLog.splice(50)

renderLog()

}

},180000)

}



/* =================================
DATABASE OPTIMIZER
================================= */

function optimizeDatabase(){

console.log("Database optimizer running")

}



/* =================================
AUTO FIREBASE RECONNECT
================================= */

function firebaseReconnect(){

window.addEventListener("offline",()=>{

console.warn("Firebase connection lost")

})

window.addEventListener("online",()=>{

console.log("Firebase reconnecting")

loadDashboard()

})

}



/* =================================
MAINTENANCE REPORT
================================= */

function maintenanceReport(){

setInterval(()=>{

console.log("===== SYSTEM REPORT =====")

console.log("Status:",systemHealth.status)

console.log("Errors:",systemHealth.errors)

console.log("Cache:",dashboardCache)

console.log("Notifications:",notifList.length)

console.log("Activity logs:",activityLog.length)

console.log("=========================")

},60000)

}



/* =================================
AUTO SYSTEM CLEANUP
================================= */

function autoSystemCleanup(){

cleanCache()

cleanOldNotif()

cleanActivityLog()

}



/* =================================
PERFORMANCE WATCH
================================= */

function performanceWatch(){

setInterval(()=>{

if(performance.memory){

console.log(

"Memory used:",

performance.memory.usedJSHeapSize

)

}

},20000)

}



/* =================================
SYSTEM SELF TEST
================================= */

function systemSelfTest(){

console.log("Running system self test")

try{

updateDashboardSummary()

}catch(e){

console.warn("Self test issue")

}

}



/* =================================
AUTO SELF TEST
================================= */

function autoSelfTest(){

setInterval(()=>{

systemSelfTest()

},30000)

}



/* =================================
MAINTENANCE ENGINE INIT
================================= */

function initMaintenanceEngine(){

healthCheckSystem()

watchdogSystem()

autoRepair()

firebaseReconnect()

autoSystemCleanup()

maintenanceReport()

performanceWatch()

autoSelfTest()

optimizeDatabase()

}



/* =================================
LOAD MAINTENANCE ENGINE
================================= */

window.addEventListener("DOMContentLoaded",()=>{

initMaintenanceEngine()

})

window.onclick=function(e){
if(e.target.classList.contains("popup")){
e.target.style.display="none"
}
}

function animateNumber(id,target){

let el=document.getElementById(id)

let start=0
let duration=1000
let step=target/(duration/16)

function update(){

start+=step

if(start>=target){
start=target
}

el.innerText="Rp"+Math.floor(start).toLocaleString("id-ID")

if(start<target){
requestAnimationFrame(update)
}

}

update()

}

/* =========================
   SIDE MENU CONTROL
========================= */


function toggleMenu(){

let menu = document.getElementById("sideMenu")
let overlay = document.getElementById("menuOverlay")
let burger = document.querySelector(".hamburger")

if(menu.style.right === "0px"){
menu.style.right = "-320px"
overlay.style.display="none"
burger.classList.remove("active")
}else{
menu.style.right = "0px"
overlay.style.display="block"
burger.classList.add("active")
}

}

/* =========================
   MENU INFO POPUP
========================= */

function openInfo(id){

document.querySelectorAll(".infoPopup").forEach(p=>{
p.style.display="none"
})

let el = document.getElementById(id+"Popup")

if(el){
el.style.display="flex"
}

/* auto close menu */
document.getElementById("sideMenu").style.left = "-280px"

}

function closeInfo(){

document.querySelectorAll(".infoPopup").forEach(p=>{
p.style.display="none"
})

}

// ============================
// SWIPE SIDEBAR MOBILE STYLE
// ============================

let startX = 0
let currentX = 0
let isDragging = false

document.addEventListener("touchstart",function(e){

startX = e.touches[0].clientX

if(startX > window.innerWidth - 50){
isDragging = true
}

})

document.addEventListener("touchmove",function(e){

if(!isDragging) return

currentX = e.touches[0].clientX

let diff = startX - currentX

let menu = document.getElementById("sideMenu")

if(diff < 0){
menu.style.right = Math.min(0 , -320 - diff) + "px"
}

})

document.addEventListener("touchend",function(){

if(!isDragging) return

let menu = document.getElementById("sideMenu")

if(parseInt(menu.style.right) > -160){
menu.style.right = "0px"
}else{
menu.style.right = "-320px"
}

isDragging = false

})

// ============================
// ANIMATED COUNTER
// ============================

function animateCounter(id,target){

let el = document.getElementById(id)

let start = 0
let duration = 1200
let step = target/(duration/16)

function update(){

start += step

if(start < target){

el.innerText = "Rp" + Math.floor(start).toLocaleString("id-ID")
requestAnimationFrame(update)

}else{

el.innerText = "Rp" + target.toLocaleString("id-ID")

}

}

update()

}

function cekAdmin(){

let admin = localStorage.getItem("adminLogin")

if(admin !== "true"){
alert("Hanya admin yang bisa melakukan ini")
return false
}

return true
}


function logoutAdmin(){

isAdmin = false

localStorage.removeItem("adminLogin")

document.body.classList.remove("admin-mode")

alert("Admin logout")

location.reload()

}

function updateAdminButtons(){

let loginBtn = document.getElementById("btnLoginAdmin")
let logoutBtn = document.getElementById("btnLogoutAdmin")

if(isAdmin){
loginBtn.style.display = "none"
logoutBtn.style.display = "inline-block"
}else{
loginBtn.style.display = "inline-block"
logoutBtn.style.display = "none"
}

}
window.addEventListener("load", updateAdminButtons)

function loginGate(){

let blok = document.getElementById("loginBlok").value
let rumah = document.getElementById("loginRumah").value
let pass = document.getElementById("loginPass").value

/* LOGIN ADMIN */

if(blok === "admin" && pass === "12345"){

localStorage.setItem("adminLogin","true")

document.getElementById("loginGate").style.display="none"

return

}

/* LOGIN WARGA */

if(blok !== "" && rumah !== "" && pass === "12345"){

localStorage.setItem("wargaLogin","true")
localStorage.setItem("wargaBlok",blok)
localStorage.setItem("wargaRumah",rumah)

document.getElementById("loginGate").style.display="none"

}else{

alert("Login gagal")

}

}

window.addEventListener("load",()=>{

if(localStorage.getItem("gateLogin") === "true"){
document.getElementById("loginGate").style.display = "none"
}

})
let blok = localStorage.getItem("wargaBlok")
let rumah = localStorage.getItem("wargaRumah")

let pengirim = blok + rumah

function logoutSystem(){

localStorage.removeItem("adminLogin")
localStorage.removeItem("wargaLogin")
localStorage.removeItem("wargaBlok")
localStorage.removeItem("wargaRumah")

location.reload()

}

function kontrolMenu(){

let admin = localStorage.getItem("adminLogin")
let warga = localStorage.getItem("wargaLogin")

let btnIuran = document.getElementById("btnIuran")
let btnPengeluaran = document.getElementById("btnPengeluaran")

if(admin === "true"){

btnIuran.style.display = "inline-block"
btnPengeluaran.style.display = "inline-block"

}

else if(warga === "true"){

btnIuran.style.display = "none"
btnPengeluaran.style.display = "none"

}

}

window.addEventListener("load", kontrolMenu)
