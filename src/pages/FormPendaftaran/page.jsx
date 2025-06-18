import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar";

const MySwal = withReactContent(Swal);

export default function FormPendaftaran() {
  const { agendaId } = useParams();
  const navigate = useNavigate();

  const [namaLengkap, setNamaLengkap] = useState("");
  const [NIM, setNIM] = useState("");
  const [noHp, setNoHp] = useState("");
  const [catatan, setCatatan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaLengkap || !NIM || !noHp) {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Harap isi semua kolom wajib.",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: namaLengkap,
          nim: NIM,
          phone: noHp,
          notes: catatan,
          agendaId: Number(agendaId),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal mendaftar");
      }

      await MySwal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        text: "Tunggu konfirmasi dikirimkan ke Whatsapp Anda.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });

      navigate("/"); // Atau arahkan ke halaman lain yang diinginkan
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-red-700 to-black flex flex-col">
      <Navbar menuItems={["Home", "About", "Agenda"]} />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-gray-100 bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-lg text-white">
          <h1 className="text-3xl font-extrabold mb-6 text-center">
            Pendaftaran Agenda <br />
            <span className="break-words">{agendaId}</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="font-semibold mb-1 block">Nama Lengkap *</span>
              <input
                type="text"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="w-full rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Masukkan nama lengkap"
                required
              />
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">NIM *</span>
              <input
                type="text"
                value={NIM}
                onChange={(e) => setNIM(e.target.value)}
                className="w-full rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="NIM"
                required
              />
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">Nomor HP *</span>
              <input
                type="tel"
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
                className="w-full rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="08xxxxxxxxxx"
                required
              />
            </label>

            <label className="block">
              <span className="font-semibold mb-1 block">Catatan (opsional)</span>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={4}
                placeholder="Tambahkan catatan jika ada"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition duration-300"
            >
              Daftar Sekarang
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
