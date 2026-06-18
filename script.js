const API =
"https://script.google.com/macros/s/AKfycby862RrzlPUrttx1q2ZMlc4ajg8eQ2TW5e-VqEzZ_AIB8NMlEeCXvLSoQAiEbIBGqGA/exec";

async function loadPegawai(){

  try{

    const response =
      await fetch(API);

    const data =
      await response.json();

    const select =
      document.getElementById("pegawai");

    select.innerHTML = "";

    data.forEach(nama=>{

      const option =
        document.createElement("option");

      option.value = nama;
      option.textContent = nama;

      select.appendChild(option);

    });

  }catch(err){

    showToast(
      "Gagal mengambil data pegawai"
    );

  }

}

async function absen(type){

  const nama =
    document.getElementById("pegawai").value;

  const shift =
    document.getElementById("shift").value;

  document.getElementById("status")
    .innerText = "Mengirim absensi...";

  try{

    const response =
      await fetch(API,{

        method:"POST",

        body:JSON.stringify({
          name:nama,
          shift:shift,
          type:type
        })

      });

    const result =
      await response.json();

    document.getElementById("status")
      .innerText = result.message;

    showToast(result.message);

  }catch(err){

    document.getElementById("status")
      .innerText = "Terjadi kesalahan";

    showToast("Terjadi kesalahan");

  }

}

function updateClock(){

  const now = new Date();

  document.getElementById("jam")
    .innerText =
      now.toLocaleTimeString("id-ID");

  document.getElementById("tanggal")
    .innerText =
      now.toLocaleDateString("id-ID",{
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
      });

}

function showToast(message){

  const toast =
    document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(()=>{

    toast.classList.remove("show");

  },3000);

}

setInterval(updateClock,1000);

updateClock();

loadPegawai();