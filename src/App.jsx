import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 w-100">
        <Topbar />

        <div className="d-flex">
          <div className="d-none d-md-block">
            <Sidebar />
          </div>
          <main className="p-3 w-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
