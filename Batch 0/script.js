const API =
"https://script.google.com/macros/s/AKfycby862RrzlPUrttx1q2ZMlc4ajg8eQ2TW5e-VqEzZ_AIB8NMlEeCXvLSoQAiEbIBGqGA/exec";

let pegawaiSelect = null;
let currentMode = "auto";

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

    const emptyOption =
      document.createElement("option");

    emptyOption.value = "";
    emptyOption.textContent = "";

    select.appendChild(emptyOption);

    data.forEach(nama => {

      if (
        !nama ||
        nama.trim() === "" ||
        nama.includes("#REF!")
      ) {
        return;
      }

      const option =
        document.createElement("option");

      option.value = nama;
      option.textContent = nama;

      select.appendChild(option);

    });

    if (pegawaiSelect) {
      pegawaiSelect.destroy();
    }

    pegawaiSelect = new TomSelect("#pegawai", {

      create: false,

      allowedEmptyOption: true,

      placeholder:
        "Silahkan Masukkan Nama Anda...",

      sortField: {
        field: "text",
        direction: "asc"
      }

    });

    pegawaiSelect.clear();

  } catch (err) {

    console.error(err);

    showToast(
      "Gagal mengambil data pegawai"
    );

  }

}

// =========================
// MODE SWITCH
// =========================
document.addEventListener(
  "DOMContentLoaded",
  () => {

    const autoBtn =
      document.getElementById("autoBtn");

    const manualBtn =
      document.getElementById("manualBtn");

    const manualFields =
      document.getElementById("manualFields");

    const btnMasuk =
      document.getElementById("btnMasuk");

    const btnPulang =
      document.getElementById("btnPulang");

    if (
      !autoBtn ||
      !manualBtn
    ) return;

    autoBtn.addEventListener("click", () => {

      currentMode = "auto";

      manualFields.style.display = "none";

      btnMasuk.style.display = "block";
      btnPulang.style.display = "block";

      autoBtn.classList.add("active");
      manualBtn.classList.remove("active");

    });

    manualBtn.addEventListener("click", () => {

      currentMode = "manual";

      manualFields.style.display = "block";

      btnMasuk.style.display = "none";
      btnPulang.style.display = "none";

      manualBtn.classList.add("active");
      autoBtn.classList.remove("active");

    });

  }
);

// =========================
// PERBAIKI ABSEN
// =========================
function perbaikiAbsen() {

  const selectedType =
    document.querySelector(
      'input[name="manualType"]:checked'
    );

  if (!selectedType) {

    showToast(
      "Pilih jenis absensi"
    );

    return;
  }

  absen(selectedType.value);

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
      "Silakan pilih nama pegawai"
    );

    return;
  }

  let payload = {

    name: nama,
    shift: shift,
    type: type,
    mode: currentMode

  };

  if (currentMode === "manual") {

    payload.manualDate =
      document.getElementById("manualDate").value;

    payload.manualTime =
      document.getElementById("manualTime").value;

    if (
      !payload.manualDate ||
      !payload.manualTime
    ) {

      showToast(
        "Tanggal dan jam wajib diisi"
      );

      return;
    }

    const timePattern =
      /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (
      !timePattern.test(
        payload.manualTime
      )
    ) {

      showToast(
        "Format jam harus HH:mm:ss"
      );

      return;
    }

  }

  document.getElementById("status")
    .innerText =
    "Mengirim absensi...";

  try {

    const response =
      await fetch(API, {

        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body: JSON.stringify(payload)

      });

    const result =
      await response.json();

    document.getElementById("status")
      .innerText =
      result.message;

    showToast(
      result.message
    );

  } catch (err) {

    console.error(err);

    document.getElementById("status")
      .innerText =
      "Terjadi kesalahan";

    showToast(
      "Terjadi kesalahan saat mengirim absensi"
    );

  }

}

// =========================
// CLOCK
// =========================
function updateClock() {

  const now =
    new Date();

  document.getElementById("jam")
    .innerText =
    now.toLocaleTimeString(
      "id-ID"
    );

  document.getElementById("tanggal")
    .innerText =
    now.toLocaleDateString(
      "id-ID",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

}

// =========================
// TOAST
// =========================
function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.innerText =
    message;

  toast.classList.add(
    "show"
  );

  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  }, 3000);

}

// =========================
// INIT
// =========================
setInterval(
  updateClock,
  1000
);

updateClock();

loadPegawai();