let totalBooking = 0;
let dataBooking = [];
let tempatAktif = null;

const dataTempat = {
    luminor: {
        nama: "Hotel Luminor",
        gambar: ["images/luminor/kamar.jpg", "images/luminor/interior.jpg", "images/luminor/kamar-mandi.webp",],
        alamat: "Jl. Sabanar Lama, Tj. Selor Hilir, Kec. Tj. Selor, Kabupaten Bulungan, Kalimantan Utara 77211",
        jam: "24 jam operasional. Waktu check in: 14.00, Waktu check out: 12.00",
        harga: "Rp 780.300",
        info: "Hotel elegan di gedung modern yang terletak di seberang Sungai Kayan ini berjarak 5 km dari Bandara Tanjung Harapan, dan 13 km dari kolam renang dan tempat aktivitas anak-anak di Taman Selimau.Kamar santai dengan furnitur bernuansa hangat menawarkan Wi-Fi, TV layar datar, fasilitas pembuat teh dan kopi, kulkas mini, serta brankas. Suite dilengkapi pemandangan kota, dan area lounge dengan sofa.Terdapat restoran elegan 24 jam dengan kedai kopi dan jendela setinggi langit-langit, bistro dengan teras, lounge di lobi kontemporer, ruang pertemuan, ruang acara, serta gym. Tersedia tempat parkir."
    },

     pangeran: {
        nama: "Hotel Pangeran Khar",
        gambar: ["images/pangeran-khar/pangeran-kamar.jpg", "images/pangeran-khar/pangeran-ruang.webp", "images/pangeran-khar/pangeran-wc.webp"],
        alamat: "Jl. Katamso Tanjung Selor Hilir Tanjung Selor Bulungan Regency North, Kalimantan, Kec. Tj. Selor, Kalimantan Utara 77212",
        jam: "24 jam operasional. Waktu check in: 13.00 Waktu check out: 12.00",
        harga: "Rp 357.000",
        info: "Grand Pangeran Khar Hotel adalah hotel dekat bandara Bandar Udara Tanjung Harapan (TJS). Hotel memiliki Resepsionis siap 24 jam untuk melayani proses check-in dan check-out. Staf membantu tamu dengan cepat dan rapi."
    },

    crown: {
        nama: "Hotel Crown",
        gambar: ["images/crown/kamar.jpg", "images/crown/mandi.jpg", "images/crown/interior.jpg"],
        alamat: "Jl. Skip II No.14, Tj. Selor Hilir, Kec. Tj. Selor, Kabupaten Bulungan, Kalimantan Utara 77214",
        jam: "24 jam operasional. Waktu check out: 12.00",
        harga: "Rp 365.715",
        info: "Crown Hotel Tanjung Selor adalah hotel di pusat kota Tanjung Selor. Hotel memiliki resepsionis 24 jam, Wi-Fi, restoran, dan area parkir. Kamar dilengkapi AC, TV, dan kamar mandi dalam. Lokasi memudahkan akses ke pusat kota dan fasilitas umum."
    },
    anugerah: {
        nama: "Hotel Grand Anugerah",
        gambar: ["images/anugerah/kamar.jpg", "images/anugerah/kolam.jpg", "images/anugerah/resto.jpg"],
        alamat: "Tanjung Selor",
        jam: "24 jam operasional. Waktu check out: 12.00",
        harga: "Rp 400.000",
        info: "Grand Anugerah Tanjung Selor adalah hotel di Tanjung Selor dengan lokasi strategis. Hotel memiliki resepsionis 24 jam, Wi-Fi, dan area parkir. Kamar dilengkapi AC, TV, dan kamar mandi dalam. Hotel juga menyediakan kolam renang untuk tamu. Cocok untuk perjalanan bisnis dan liburan singkat."
    }
};

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function showSection(id) {
    const pages = document.querySelectorAll(".page");
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function openDetail(key) {
    const t = dataTempat[key];
    tempatAktif = key;

    document.getElementById("dNama").textContent = t.nama;
    document.getElementById("dAlamat").textContent = t.alamat;
    document.getElementById("dJam").textContent = t.jam;
    document.getElementById("dHarga").textContent = t.harga;
    document.getElementById("dInfo").textContent = t.info;

    const galeri = document.getElementById("dGallery");
    galeri.innerHTML = "";
    t.gambar.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        galeri.appendChild(img);
    });

    document.getElementById("bTempat").textContent = t.nama;
    showSection("detail");
}

function tambahBooking() {
    const nama = document.getElementById("bNama").value;
    const tanggal = document.getElementById("bTanggal").value;
    const malam = parseInt(document.getElementById("bMalam").value);

    if (nama === "" || tanggal === "" || isNaN(malam) || !tempatAktif) {
        alert("Lengkapi data booking");
        return;
    }

    const tglBooking = new Date(tanggal);
    const tglCheckout = new Date(tglBooking);
    tglCheckout.setDate(tglCheckout.getDate() + malam);

    let hargaStr = dataTempat[tempatAktif].harga.replace(/[^0-9]/g, "");
    let harga = parseInt(hargaStr);
    let total = harga * malam;

    let dataBaru = {
        tempat: dataTempat[tempatAktif].nama,
        nama: nama,
        booking: tanggal,
        checkin: tanggal,
        checkout: tglCheckout.toISOString().split("T")[0],
        malam: malam,
        harga: harga,
        total: total
    };

    dataBooking.push(dataBaru);
    totalBooking++;

    document.getElementById("bNama").value = "";
    document.getElementById("bTanggal").value = "";
    document.getElementById("bMalam").value = "";

    updateLaporan();
    alert("Booking tersimpan");
}

function updateLaporan() {
    document.getElementById("totalBooking").textContent = totalBooking;
    const tbody = document.getElementById("tabelLaporan");
    tbody.innerHTML = "";

    dataBooking.forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + d.tempat + "</td>" +
            "<td>" + d.nama + "</td>" +
            "<td>" + d.booking + "</td>" +
            "<td>" + d.checkin + "</td>" +
            "<td>" + d.checkout + "</td>" +
            "<td>" + d.malam + "</td>" +
            "<td>" + formatRupiah(d.harga) + "</td>" +
            "<td>" + formatRupiah(d.total) + "</td>";
        tbody.appendChild(tr);
    });
}
function downloadExcelSemua() {
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>

    <h2>Data Booking</h2>
    <table border="1">
        <tr>
            <th>Tempat</th>
            <th>Nama</th>
            <th>Tanggal Booking</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Jumlah Malam</th>
            <th>Harga / Malam</th>
            <th>Total Harga</th>
        </tr>
    `;

    dataBooking.forEach(d => {
        html += `
        <tr>
            <td>${d.tempat}</td>
            <td>${d.nama}</td>
            <td>${d.booking}</td>
            <td>${d.checkin}</td>
            <td>${d.checkout}</td>
            <td>${d.malam}</td>
            <td>${formatRupiah(d.harga)}</td>
            <td>${formatRupiah(d.total)}</td>
        </tr>
        `;
    });

    html += `
    </table>

    <h2>Data Tamu</h2>
    <table border="1">
        <tr>
            <th>Nama</th>
            <th>No HP</th>
        </tr>
    `;

    dataTamu.forEach(t => {
        html += `
        <tr>
            <td>${t.nama}</td>
            <td>${t.hp}</td>
        </tr>
        `;
    });

    html += `
    </table>

    <h2>Check In Out</h2>
    <table border="1">
        <tr>
            <th>Nama</th>
            <th>Status</th>
            <th>Tanggal</th>
        </tr>
    `;

    dataCheck.forEach(c => {
        html += `
        <tr>
            <td>${c.nama}</td>
            <td>${c.status}</td>
            <td>${c.tanggal}</td>
        </tr>
        `;
    });

    html += `
    </table>

    <h2>Pengeluaran</h2>
    <table border="1">
        <tr>
            <th>Nama</th>
            <th>Jumlah</th>
        </tr>
    `;

    dataPengeluaran.forEach(p => {
        html += `
        <tr>
            <td>${p.nama}</td>
            <td>${formatRupiah(parseInt(p.jumlah))}</td>
        </tr>
        `;
    });

    html += `
    </table>

    </body>
    </html>
    `;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan_lengkap.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


let dataProperti = [];
let dataTamu = [];
let dataCheck = [];
let dataPengeluaran = [];

function tambahProperti() {
    const nama = document.getElementById("mNama").value;
    const harga = document.getElementById("mHarga").value;
    if (nama === "" || harga === "") return;

    dataProperti.push({ nama, harga });
    const tbody = document.getElementById("tabelProperti");
    const tr = document.createElement("tr");
    tr.innerHTML = "<td>" + nama + "</td><td>Rp " + parseInt(harga).toLocaleString("id-ID") + "</td>";
    tbody.appendChild(tr);

    document.getElementById("mNama").value = "";
    document.getElementById("mHarga").value = "";
}

function tambahTamu() {
    const nama = document.getElementById("tNama").value;
    const hp = document.getElementById("tHp").value;
    if (nama === "" || hp === "") return;

    dataTamu.push({ nama, hp });
    const tbody = document.getElementById("tabelTamu");
    const tr = document.createElement("tr");
    tr.innerHTML = "<td>" + nama + "</td><td>" + hp + "</td>";
    tbody.appendChild(tr);

    document.getElementById("tNama").value = "";
    document.getElementById("tHp").value = "";
}

function tambahCheck() {
    const nama = document.getElementById("cNama").value;
    const status = document.getElementById("cStatus").value;
    const tanggal = document.getElementById("cTanggal").value;

    if (nama === "" || status === "" || tanggal === "") {
        alert("Nama, status, dan tanggal wajib diisi");
        return;
    }

    const item = {
        nama: nama,
        status: status,
        tanggal: tanggal
    };

    dataCheck.push(item);
    renderCheck();

    document.getElementById("cNama").value = "";
    document.getElementById("cStatus").value = "";
    document.getElementById("cTanggal").value = "";
}

function renderCheck() {
    const tbody = document.getElementById("tabelCheck");
    tbody.innerHTML = "";

    dataCheck.forEach(function(item) {
        const tr = document.createElement("tr");

        const tdNama = document.createElement("td");
        tdNama.textContent = item.nama;

        const tdStatus = document.createElement("td");
        tdStatus.textContent = item.status;

        const tdTanggal = document.createElement("td");
        tdTanggal.textContent = item.tanggal;

        tr.appendChild(tdNama);
        tr.appendChild(tdStatus);
        tr.appendChild(tdTanggal);

        tbody.appendChild(tr);
    });
}


function tambahPengeluaran() {
    const nama = document.getElementById("pNama").value;
    const jumlah = document.getElementById("pJumlah").value;
    if (nama === "" || jumlah === "") return;

    dataPengeluaran.push({ nama, jumlah });
    const tbody = document.getElementById("tabelPengeluaran");
    const tr = document.createElement("tr");
    tr.innerHTML = "<td>" + nama + "</td><td>Rp " + parseInt(jumlah).toLocaleString("id-ID") + "</td>";
    tbody.appendChild(tr);

    document.getElementById("pNama").value = "";
    document.getElementById("pJumlah").value = "";
}

