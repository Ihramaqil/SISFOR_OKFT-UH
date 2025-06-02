import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Organizations from "./pages/Org/page";
import Agenda from "./pages/Agenda/page";
import NotFound from "./pages/404/page";
import DetailAgenda from "./pages/DetailAgenda/page"; // Halaman DetailAgenda
import Login from "./pages/Login/page";
import Register from "./pages/Register/page";
import FormPendaftaran from "./pages/FormPendaftaran/page";

import './index.css';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/org/:orgName" element={<Organizations />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/org/:orgName/Agenda/:agendaId" element={<DetailAgenda />} /> 
            <Route path="/login" element={<Login />} />            {/* Tambahkan ini */}
            <Route path="/register" element={<Register />} />
            <Route path="/agenda/:agendaId/form-pendaftaran" element={<FormPendaftaran />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
); 

export default App;
