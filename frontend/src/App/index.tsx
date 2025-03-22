import "./App.css";
import MyRoutes from "../routes";
import Header from "../components/Header";
import ThemeInitializer from "../components/ThemeInitializer";

function App() {
  return (
    <div>
      <Header />
      <MyRoutes />
    </div>
  );
}

export default App;
