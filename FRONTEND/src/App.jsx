import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import ContextWrapper from "./contexts/ContextWrapper";

function App() {
  return (
    <ContextWrapper>
      <Header />
      <Outlet />
      <Footer />
    </ContextWrapper>
  );
}

export default App;
