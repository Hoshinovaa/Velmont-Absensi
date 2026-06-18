const API =
"https://script.google.com/macros/s/AKfycby862RrzlPUrttx1q2ZMlc4ajg8eQ2TW5e-VqEzZ_AIB8NMlEeCXvLSoQAiEbIBGqGA/exec";

let pegawaiSelect = null;

// =========================
// LOAD PEGAWAI
// =========================
async function loadPegawai() {

  try {

    const response = await fetch(API);
    const data = await response.json();

    const select =
      document.getElementById("pegawai");

    select.innerHTML = "";

    data.forEach(nama => {

      const option =
        document.createElement("option");

      option.value = nama;
      option.textContent = nama;

      select.appendChild(option);

    });

    // Inisialisasi TomSelect setelah data masuk
    if (pegawaiSelect) {
      pegawaiSelect.destroy();
    }

    pegawaiSelect = new TomSelect("#pegawai", {

      create: false,

      placeholder: "Cari nama pegawai...",

      sortField: {
        field: "text",
        direction: "asc"
      }

    });

  } catch (err) {

    console.error(err);

    showToast(
      "Gagal mengambil data pegawai"
    );

  }

}

// =========================
// ABSEN
// =========================
async function absen(type) {

  const nama =
    document.getElementById("pegawai").value;

  const shift =
    document.getElementById("shift").value;

  if (!nama) {

    showToast(
      "Silakan pilih pegawai terlebih dahulu"
    );

    return;
  }

  document.getElementById("status")
    .innerText = "Mengirim absensi...";

  try {

    const response = await fetch(API, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: nama,
        shift: shift,
        type: type
      })

    });

    const result =
      await response.json();

    document.getElementById("status")
      .innerText = result.message;

    showToast(result.message);

  } catch (err) {

    console.error(err);

    document.getElementById("status")
      .innerText = "Terjadi kesalahan";

    showToast(
      "Terjadi kesalahan saat mengirim absensi"
    );

  }

}

// =========================
// CLOCK
// =========================
function updateClock() {

  const now = new Date();

  document.getElementById("jam")
    .innerText =
    now.toLocaleTimeString("id-ID");

  document.getElementById("tanggal")
    .innerText =
    now.toLocaleDateString("id-ID", {

      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"

    });

}

// =========================
// TOAST
// =========================
function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}

// =========================
// INIT
// =========================
setInterval(updateClock, 1000);

updateClock();

loadPegawai();