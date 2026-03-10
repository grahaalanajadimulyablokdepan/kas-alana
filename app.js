let chartKas=null

function toggleMenu(){
document.getElementById("sideMenu").classList.toggle("open")
}

function showPopup(id){

document.querySelectorAll(".popup").forEach(p=>{
p.style.display="none"
})

document.getElementById(id).style.display="block"
}

function rupiah(x){
return "Rp"+Number(x).toLocaleString("id-ID")
}

function loadData(){

let totalIuran=0
let totalKeluar=0

db.collection("iuran").onSnapshot(s=>{

totalIuran=0

s.forEach(doc=>{
totalIuran+=Number(doc.data().jumlah)
})

document.getElementById("totalIuran").innerText=rupiah(totalIuran)

})

db.collection("pengeluaran").onSnapshot(p=>{

totalKeluar=0

p.forEach(doc=>{
totalKeluar+=Number(doc.data().jumlah)
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
backgroundColor:["#28a745","#dc3545","#0d6efd"]
}]
}

})

}

loadData()
