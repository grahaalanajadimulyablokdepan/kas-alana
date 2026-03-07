<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Kas Graha Alana</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="style.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

</head>

<body>


<!-- NAVBAR -->

<nav class="navbar navbar-dark bg-dark">

<div class="container">

<div class="d-flex align-items-center">

<img src="logo.png" class="logo">

<div class="brand-text text-white">

Kas Graha Alana

<div class="header-sub">
Blok A1 • A2 • A3 • B1 • B2 • B3
</div>

</div>

</div>

</div>

</nav>



<div class="container mt-4">


<!-- LOGIN -->

<div id="loginBox" class="card p-4 shadow mb-4">

<h5>Login Pengurus</h5>

<input id="adminPass" class="form-control mb-3" placeholder="Password">

<button class="btn btn-primary w-100" onclick="loginAdmin()">
Login
</button>

</div>



<!-- PANEL ADMIN -->

<div id="adminPanel" style="display:none">


<div class="row g-3">


<!-- INPUT IURAN -->

<div class="col-md-6">

<div class="card shadow p-4">

<h5>Input Iuran Warga</h5>

<input id="nama" class="form-control mb-2" placeholder="Nama Warga">

<select id="blok" class="form-control mb-2">
<option>A1</option>
<option>A2</option>
<option>A3</option>
<option>B1</option>
<option>B2</option>
<option>B3</option>
</select>

<input id="rumah" class="form-control mb-2" placeholder="Nomor Rumah">

<select id="bulan" class="form-control mb-2">

<option>Januari</option>
<option>Februari</option>
<option>Maret</option>
<option>April</option>
<option>Mei</option>
<option>Juni</option>
<option>Juli</option>
<option>Agustus</option>
<option>September</option>
<option>Oktober</option>
<option>November</option>
<option>Desember</option>

</select>

<select id="tahun" class="form-control mb-2">

<option>2025</option>
<option selected>2026</option>
<option>2027</option>

</select>

<input id="jumlah" class="form-control mb-3" placeholder="Jumlah Iuran">

<button class="btn btn-success w-100" onclick="tambahIuran()">
Simpan Iuran
</button>

</div>

</div>



<!-- INPUT PENGELUARAN -->

<div class="col-md-6">

<div class="card shadow p-4">

<h5>Input Pengeluaran Kas</h5>

<input id="ket" class="form-control mb-2" placeholder="Keterangan">

<input id="jumlahKeluar" class="form-control mb-3" placeholder="Jumlah Pengeluaran">

<button class="btn btn-danger w-100" onclick="tambahPengeluaran()">
Simpan Pengeluaran
</button>

</div>

</div>


</div>

</div>



<!-- DASHBOARD -->

<div class="row g-3 mt-3">

<div class="col-md-4">

<div class="card text-center shadow p-3">

<h6>Total Kas</h6>
<h2 id="totalKas">Rp0</h2>

</div>

</div>

<div class="col-md-4">

<div class="card text-center shadow p-3">

<h6>Iuran Masuk</h6>
<h2 id="totalIuran">Rp0</h2>

</div>

</div>

<div class="col-md-4">

<div class="card text-center shadow p-3">

<h6>Pengeluaran</h6>
<h2 id="totalKeluar">Rp0</h2>

</div>

</div>

</div>



<!-- GRAFIK -->

<div class="card shadow mt-4 p-4">

<h5>Grafik Kas Bulanan</h5>

<canvas id="chart"></canvas>

</div>



<!-- PETA RUMAH -->

<div class="card shadow mt-4 p-4">

<h5>Peta Rumah Perumahan</h5>

<div id="mapPerumahan"></div>

</div>



<!-- CEK IURAN -->

<div class="card shadow mt-4 p-4">

<h5>Cek Iuran Rumah</h5>

<button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#cekModal">

Pilih Rumah

</button>

<div id="hasil" class="mt-3"></div>

</div>



<!-- RIWAYAT -->

<div class="card shadow mt-4 p-4">

<h5>Riwayat Iuran</h5>

<button class="btn btn-success mb-3" onclick="exportExcel()">

Download Excel

</button>

<table class="table table-striped">

<thead>

<tr>
<th>Nama</th>
<th>Blok</th>
<th>Rumah</th>
<th>Bulan</th>
<th>Tahun</th>
<th>Jumlah</th>
</tr>

</thead>

<tbody id="tabelIuran"></tbody>

</table>

</div>



</div>



<!-- MODAL CEK RUMAH -->

<div class="modal fade" id="cekModal">

<div class="modal-dialog">

<div class="modal-content">

<div class="modal-header">

<h5>Pilih Rumah</h5>

<button class="btn-close" data-bs-dismiss="modal"></button>

</div>

<div class="modal-body">

<select id="cekBlok" class="form-control mb-2">

<option>A1</option>
<option>A2</option>
<option>A3</option>
<option>B1</option>
<option>B2</option>
<option>B3</option>

</select>

<select id="cekNomor" class="form-control"></select>

</div>

<div class="modal-footer">

<button class="btn btn-primary" onclick="cekRumah()">Cek</button>

</div>

</div>

</div>

</div>



<div class="text-center mt-4 mb-4">

Kas Graha Alana • Sistem Kas Digital

</div>



<script src="firebase.js"></script>
<script src="app.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
