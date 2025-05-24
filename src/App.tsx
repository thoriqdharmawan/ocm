import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import Topbar from "./components/ui/Topbar";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Home from "./pages/LandingPage";
import { QueryProvider } from "./providers/QueryProvider";
import OnlyGuest from "./providers/OnlyGuest";
import RequireAuth from "./providers/RequireAuth";

function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <OnlyGuest>
                <Login />
              </OnlyGuest>
            }
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <div className="d-flex flex-column min-vh-100 w-100">
                  <Topbar />
                  <div className="d-flex flex-column flex-lg-row">
                    <div className="d-none d-lg-block">
                      <Sidebar />
                    </div>
                    <main className="p-3 w-100">
                      <Routes>
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/orders" element={<Orders />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;
