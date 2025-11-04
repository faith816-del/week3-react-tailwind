import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Task from "./pages/task";
import Layout from "./components/layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

