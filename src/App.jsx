import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Content from "./components/Content/Content";
import { Provider } from "react-redux";
import { store } from "./store/api";
import { ThemeProvider } from "./Context/ThemeContext";

const s = store()


function App() {
  return (
    <Provider store={s}>
      <ThemeProvider>
          <Content />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
