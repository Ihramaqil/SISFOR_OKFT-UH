import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoOKFT from "../../assets/OKFT-UH.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const agendaId = params.get("agendaId");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Login gagal");
        return;
      }

      const data = await res.json();
      alert(data.message || "Login berhasil");

      // Simpan token ke localStorage
      localStorage.setItem("access_token", data.access_token);

      if (agendaId) {
        navigate(`/agenda/${agendaId}/form-pendaftaran`);
      } else {
        navigate("/form-pendaftaran");
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-l from-red-700 to-black">
      <nav className="flex items-center justify-start px-12 py-6">
        <img src={LogoOKFT} alt="OKFT Logo" className="h-14" />
        <span className="ml-4 text-white font-extrabold text-2xl">OKFT-UH</span>
      </nav>

      <main className="flex-grow flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 bg-opacity-10 backdrop-blur-md rounded-lg p-10 w-full max-w-md shadow-lg"
        >
          <h1 className="text-white text-4xl font-extrabold mb-8 text-center">
            Masuk ke Akun Anda
          </h1>

          <label className="block mb-4">
            <span className="text-white font-semibold mb-1 block">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="email@domain.com"
            />
          </label>

          <label className="block mb-6">
            <span className="text-white font-semibold mb-1 block">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-bold py-3 rounded-md"
          >
            Masuk
          </button>

          <p className="mt-6 text-center text-gray-300">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-red-400 font-semibold hover:text-red-600 underline"
            >
              Daftar di sini
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
