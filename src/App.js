import { GlobalStoreProvider } from "./Context/GlobalStore";
import AppRouter from "./routes/AppRouter";


function App() {
  return (
    <div id="App" className="h-screen w-screen overflow-auto relative">
      <GlobalStoreProvider>
        <AppRouter />
      </GlobalStoreProvider>
    </div>
  );
}

export default App;
