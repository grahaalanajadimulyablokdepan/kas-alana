let chart

function rupiah(n){ return 'Rp '+Number(n).toLocaleString('id-ID') }

async function loadData(){

const iuranSnap = await db.collection('iuran').get() const keluarSnap = await db.collection('pengeluaran').get()

let iuran=[] let keluar=[]

iuranSnap.forEach(doc=>iuran.push(doc.data())) keluarSnap.forEach(doc=>keluar.push(doc.data()))

render(iuran,keluar)

}

function render(iuran,keluar){

let totalIuran=iuran.reduce((a,b)=>a+Number(b.jumlah),0) let totalKeluar=keluar.reduce((a,b)=>a+Number(b.jumlah),0) let kas=totalIuran-totalKeluar

document.getElementById('totalKas').innerText=rupiah(kas) document.getElementById('totalIuran').innerText=rupiah(totalIuran) document.getElementById('totalKeluar').innerText=rupiah(totalKeluar)

let tb=document.getElementById('tabelIuran') tb.innerHTML=''

iuran.forEach(d=>{ let tr=document.createElement('tr') tr.innerHTML=<td>${d.nama}</td><td>${d.blok}</td><td>${d.rumah}</td><td>${d.bulan}</td><td>${rupiah(d.jumlah)}</td>

tb.appendChild(tr) })

buatChart(totalIuran,totalKeluar,kas)

}

function buatChart(iuran,keluar,kas){

let ctx=document.getElementById('chart')

if(chart) chart.destroy()

chart=new Chart(ctx,{type:'bar',data:{labels:['Iuran','Pengeluaran','Kas'],datasets:[{data:[iuran,keluar,kas]}]}})

}

async function tambahIuran(){

await db.collection('iuran').add({ nama:nama.value, blok:blok.value, rumah:rumah.value, bulan:bulan.value, jumlah:jumlah.value })

loadData()

}

async function tambahPengeluaran(){

await db.collection('pengeluaran').add({ ket:ket.value, jumlah:jumlahKeluar.value })

loadData()

}

async function cekRumah(){

let val=document.getElementById('cek').value.toUpperCase()

let [blok,rumah]=val.split('-')

const snap=await db.collection('iuran') .where('blok','==',blok) .where('rumah','==',rumah) .get()

let html=''

snap.forEach(doc=>{ let d=doc.data() html+=${d.bulan} : ${rupiah(d.jumlah)} <br> })

document.getElementById('hasil').innerHTML=html||'Belum ada pembayaran'

}

loadData()

function loginAdmin(){

let pass = document.getElementById("adminPass").value

if(pass === "blokdepan123"){

document.getElementById("adminPanel").style.display="block"
document.getElementById("loginBox").style.display="none"

}else{

alert("Password salah")

}

}


function cekStatusRumah(){

let bulan = document.getElementById("bulan").value
let tahun = document.getElementById("tahun").value

db.collection("iuran")
.where("bulan","==",bulan)
.where("tahun","==",tahun)
.get()
.then(snapshot=>{

let rumahBayar=[]

snapshot.forEach(doc=>{
rumahBayar.push(doc.data().blok+"-"+doc.data().rumah)
})

let html=""

for(let i=1;i<=20;i++){

let rumah="A1-"+i

if(rumahBayar.includes(rumah)){

html+="<p>"+rumah+" 🟢 Lunas</p>"

}else{

html+="<p>"+rumah+" 🔴 Belum bayar</p>"

}

}

document.getElementById("hasil").innerHTML=html

})

}

function loadChart(){

let ctx=document.getElementById("chart")

new Chart(ctx,{

type:"bar",

data:{

labels:["Kas Masuk","Pengeluaran"],

datasets:[{

label:"Kas",

data:[1000000,300000],

backgroundColor:["green","red"]

}]

}

})

}

function exportKas(){

alert("Fitur export laporan akan dibuat ke Excel")

}
