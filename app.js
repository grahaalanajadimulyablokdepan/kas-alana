const passwords=["ketua123","bendahara123"]
let iuran=[]

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
let tanggal=document.getElementById("tanggal").value
let bulan=document.getElementById("bulan").value
let tahun=document.getElementById("tahun").value
let jumlah=parseInt(document.getElementById("jumlah").value)

if(!nama || !rumah || !tanggal || !bulan || !tahun || !jumlah){
alert("Data belum lengkap")
return
}

let data={
nama:nama,
blok:blok,
rumah:rumah,
tanggal:tanggal,
bulan:bulan,
tahun:tahun,
jumlah:jumlah
}

db.collection("iuran").add(data)
.then(()=>{
alert("Iuran berhasil disimpan")
loadData()
})

}



function tambahPengeluaran(){

let ket=document.getElementById("ket").value
let tanggal=document.getElementById("tanggalKeluar").value
let bulan=document.getElementById("bulanKeluar").value
let tahun=document.getElementById("tahunKeluar").value
let jumlah=document.getElementById("jumlahKeluar").value

db.collection("pengeluaran").add({
ket:ket,
tanggal:tanggal,
bulan:bulan,
tahun:tahun,
jumlah:Number(jumlah)
}).then(()=>{
loadData()
alert("Pengeluaran berhasil disimpan")
})

}



function loadData(){

let totalIuran=0
let totalKeluar=0
let rumahBayar=[]



db.collection("iuran").get().then(s=>{

let dataIuran=[]

s.forEach(doc=>{
let d=doc.data()

totalIuran+=Number(d.jumlah)
rumahBayar.push(d.blok+"-"+d.rumah)

dataIuran.push(d)
})

dataIuran.sort((a,b)=>{

if(a.blok===b.blok){
return Number(a.rumah)-Number(b.rumah)
}

return a.blok.localeCompare(b.blok)

})

let html=""

dataIuran.forEach(d=>{

html+=`
<tr>
<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${rupiah(d.jumlah)}</td>
</tr>
`

})

let tabel=document.getElementById("detailTabelIuran")
if(tabel) tabel.innerHTML=html

let totalIuranEl=document.getElementById("totalIuran")
if(totalIuranEl) totalIuranEl.innerText=rupiah(totalIuran)



db.collection("pengeluaran").get().then(p=>{

let htmlKeluar=""

p.forEach(doc=>{

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

let totalKeluarEl=document.getElementById("totalKeluar")
if(totalKeluarEl) totalKeluarEl.innerText=rupiah(totalKeluar)



let kas=totalIuran-totalKeluar

let kasEl=document.getElementById("totalKas")
if(kasEl) kasEl.innerText=rupiah(kas)

let detailIuran2=document.getElementById("detailIuran2")
if(detailIuran2) detailIuran2.innerText=rupiah(totalIuran)

let totalIuranDetail=document.getElementById("totalIuranDetail")
if(totalIuranDetail) totalIuranDetail.innerText=rupiah(totalIuran)

let detailKeluar2=document.getElementById("detailKeluar2")
if(detailKeluar2) detailKeluar2.innerText=rupiah(totalKeluar)

let totalKeluarDetail=document.getElementById("totalKeluarDetail")
if(totalKeluarDetail) totalKeluarDetail.innerText=rupiah(totalKeluar)
if(detailKeluar) detailKeluar.innerText=rupiah(totalKeluar)

let detailKas=document.getElementById("detailKas")
if(detailKas) detailKas.innerText=rupiah(kas)

updateMap(rumahBayar)

generateBelumBayar(rumahBayar)



// ======================
// STATISTIK RUMAH
// ======================

let totalRumah=0

for(let b in blokData){
totalRumah+=blokData[b]
}

let sudahBayar=rumahBayar.length
let belumBayar=totalRumah-sudahBayar



let elTotal=document.getElementById("totalRumah")
if(elTotal) elTotal.innerText=totalRumah

let elBayar=document.getElementById("rumahBayar")
if(elBayar) elBayar.innerText=sudahBayar

let elBelum=document.getElementById("rumahBelum")
if(elBelum) elBelum.innerText=belumBayar



// ======================
// PROGRESS BAR
// ======================

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

html+=`<div id="${blok}-${i}" class="rumah belum" onclick="bukaRumah('${blok}-${i}')">${blok}-${i}</div>`
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
updateBadge()
function bukaModal(id){
let modal = new bootstrap.Modal(document.getElementById(id))
modal.show()
}

function kirimKomplain(){

let nama=document.getElementById("komplainNama").value
let blok=document.getElementById("komplainBlok").value
let rumah=document.getElementById("komplainRumah").value
let hp=document.getElementById("komplainHP").value
let isi=document.getElementById("komplainIsi").value

if(nama=="" || isi==""){
alert("Isi nama dan masukan terlebih dahulu")
return
}

db.collection("komplain").add({

nama:nama,
blok:blok,
rumah:rumah,
hp:hp,
isi:isi,
tanggal:new Date()

}).then(()=>{

let toast = new bootstrap.Toast(document.getElementById("toastSukses"))
toast.show()

document.getElementById("komplainNama").value=""
document.getElementById("komplainRumah").value=""
document.getElementById("komplainHP").value=""
document.getElementById("komplainIsi").value=""

})

}
function bukaRumah(kode){

let modal=new bootstrap.Modal(document.getElementById("modalRumah"))

document.getElementById("judulRumah").innerText="Histori Pembayaran "+kode

db.collection("iuran")
.where("blok","==",kode.split("-")[0])
.where("rumah","==",kode.split("-")[1])
.get()
.then(s=>{

let html=""

s.forEach(doc=>{

let d=doc.data()

html+=`
<tr>
<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${rupiah(d.jumlah)}</td>
</tr>
`

})

if(html==""){
html=`<tr><td colspan="4" class="text-center">Belum ada pembayaran</td></tr>`
}

document.getElementById("historiRumah").innerHTML=html

modal.show()

})

}

function updateBadge(){

db.collection("komplain").get().then(s=>{

document.getElementById("badgeKomplain").innerText=s.size

})

}
function loadKomplain(){

db.collection("komplain")
.orderBy("tanggal","desc")
.get()
.then(s=>{

let html=""

s.forEach(doc=>{

let d=doc.data()

html+=`
<tr>
<td>${d.nama}</td>
<td>${d.blok}</td>
<td>${d.rumah}</td>
<td>${d.hp}</td>
<td>${d.isi}</td>
</tr>
`

})

if(html==""){
html=`<tr><td colspan="5">Belum ada komplain</td></tr>`
}

document.getElementById("tabelKomplain").innerHTML=html

})

}
function loginWarga(){

let nama=document.getElementById("wargaNama").value
let blok=document.getElementById("wargaBlok").value
let rumah=document.getElementById("wargaRumah").value

if(nama=="" || rumah==""){
alert("Isi data dulu")
return
}

localStorage.setItem("wargaLogin","true")
localStorage.setItem("nama",nama)
localStorage.setItem("blok",blok)
localStorage.setItem("rumah",rumah)

document.getElementById("loginWarga").style.display="none"
document.getElementById("dashboard").style.display="flex"

}

function cekLoginWarga(){

let status=localStorage.getItem("wargaLogin")

if(status=="true"){

document.getElementById("loginWarga").style.display="none"
document.getElementById("dashboard").style.display="flex"

}

}

cekLoginWarga()

function logoutWarga(){

localStorage.removeItem("wargaLogin")
location.reload()

}
function cekAksesKomplain(){

let status = localStorage.getItem("wargaLogin")

if(status!="true"){
alert("Harus login warga dulu")
return
}

let modal = new bootstrap.Modal(document.getElementById("modalKomplain"))
modal.show()

}

function cekAksesDaftarKomplain(){

let status = localStorage.getItem("wargaLogin")

if(status!="true"){
alert("Harus login warga dulu")
return
}

loadKomplain()

let modal = new bootstrap.Modal(document.getElementById("modalKomplainList"))
modal.show()

}

let tanggalSelect = document.getElementById("tanggal");

for(let i=1;i<=31;i++){

let opt=document.createElement("option")
opt.value=i
opt.text=i

tanggalSelect.appendChild(opt)

}

let bulanSelect=document.getElementById("bulan")

let bulanNama=[
"Januari","Februari","Maret","April","Mei","Juni",
"Juli","Agustus","September","Oktober","November","Desember"
]

for(let i=0;i<12;i++){

let opt=document.createElement("option")

opt.value=i+1
opt.text=bulanNama[i]

bulanSelect.appendChild(opt)

}

let tahunSelect=document.getElementById("tahun")

for(let i=2025;i<=2099;i++){

let opt=document.createElement("option")

opt.value=i
opt.text=i

tahunSelect.appendChild(opt)

}

function filterIuran(){

let bulan=document.getElementById("filterBulan").value
let tahun=document.getElementById("filterTahun").value

let data=dataIuran

if(bulan!=""){
data=data.filter(x=>x.bulan==bulan)
}

if(tahun!=""){
data=data.filter(x=>x.tahun==tahun)
}

render(data)

}

