import LogoOKFT from "../../assets/OKFT-UH.png";
import { useState, useEffect } from "react";
import { firestore } from "../../api/firebaseConfig";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export default function Agenda() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orgName = queryParams.get("orgName"); // Mengambil orgName dari URL
    const [agendas, setAgendas] = useState([]);

    useEffect(() => {
        const fetchAgendas = async () => {
            try {
                if (!orgName) return;

                // Buat reference ke dokumen organisasi berdasarkan orgName
                const orgRef = doc(firestore, "Organisasi_mahasiswa", orgName);

                // Query agenda berdasarkan reference
                const agendaCollection = collection(firestore, "Agenda_kegiatan");
                const agendaQuery = query(
                    agendaCollection,
                    where("Nama_organisasi", "==", orgRef)
                );

                // Ambil data agenda
                const agendaSnapshot = await getDocs(agendaQuery);
                const agendaList = agendaSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setAgendas(agendaList);
            } catch (error) {
                console.error("Error fetching agendas: ", error);
            } 
        };

        fetchAgendas();
    }, [orgName]);

    return (
        <div className="w-full h-screen flex flex-col">

            <nav className="flex items-center justify-between px-24 py-3 bg-gradient-to-l from-red-600 to-black fixed top-0 w-full z-10 shadow-lg">
                <div className="flex items-center">
                    <img src={LogoOKFT} alt="Logo OKFT" className="h-14 md:h-16" />
                    <span className="ml-9 text-xl md:text-2xl font-bold text-white">OKFT-UH</span>
                </div>

                <ul className="hidden md:flex space-x-12 text-white text-sm md:text-base font-medium">
                    {['About', 'Agenda', 'Daftar'].map((label, index) => (
                        <li key={index} className="relative cursor-pointer hover:text-red-400 transition duration-300"
                            onClick={() => {
                                const targetClass = label === 'Agenda' ? 'agenda' : 
                                                    label === 'Daftar' ? 'registration' : 'hero';
                                const targetElement = document.querySelector(`.${targetClass}`);
                                targetElement?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        > {label}
                            <div className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-red-400 transition-all duration-300 hover:w-full"></div>
                        </li>
                    ))}
                </ul>
            </nav>

            <main className="w-full h-full py-10">
                <div className="hero w-full h-screen bg-bgAgenda bg-cover flex flex-col items-center px-24">
                    <div className="w-full h-[10%]"><p>.</p></div>
                    
                    <div className="title w-full h-[15%] capitalize text-2xl font-bold tracking-wider flex flex-col">
                        <p>agenda kegiatan</p>
                        <div className="terminator w-[15%] h-0.5 bg-red-900 mt-1"></div>
                    </div>

                    <div className="namaOrganisasi w-full h-[10%] flex justify-center mt-24">
                        <p className="text-7xl font-extrabold shine uppercase text-white hover:cursor-pointer">OKIF FT-UH</p>
                    </div>
                    
                    <div className="searchBar w-full h-[25%] mt-7 flex justify-center">
                        <input type="search" className="w-1/2 h-12 text-red-500 font-bold tracking-wide rounded-md py-6 px-9 outline-none" placeholder="Masukkan agenda yang ingin Anda cari" />
                    </div>
                </div>

                <div className="terminator agenda px-56 pt-12 justify-center flex flex-col items-center">
                    <p className="text-4xl capitalize font-bold">agenda kegiatan</p>
                    <div className="terminator w-[25%] h-0.5 bg-red-900 mt-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-56 pb-80 bg-blue-200">
                    {agendas.map((agenda) => (
                        <div key={agenda.id} className="p-6 bg-gray-300 shadow-md rounded-lg hover:shadow-xl transition-shadow hover:cursor-pointer">
                            <p className="text-xl font-bold mb-2">
                                {agenda.Nama_kegiatan}
                            </p>
                            <p className="text-gray-600 text-justify mb-2">
                                {agenda.Deskripsi}
                            </p>
                            <p className="text-sm text-gray-500 ">
                                Lokasi: {agenda.Lokasi}
                            </p>
                            <p className="text-sm text-gray-500">
                                Tanggal:{" "}
                                {agenda.Tanggal && agenda.Tanggal.seconds
                                    ? new Date(agenda.Tanggal.seconds * 1000).toLocaleDateString()
                                    : "Tanggal tidak tersedia"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Status: {agenda.Status}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}