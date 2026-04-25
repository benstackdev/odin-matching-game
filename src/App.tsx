import { Game } from "./components/Game";

function App() {
  return (
    <div className="h-screen flex
                    flex-col justify-between max-w-7xl w-full
                    mx-auto">
      <div className="p-6 lg:p-8 flex-1">
        <Game />
      </div>
      <footer className="flex justify-center align-center p-4">
        Made by BenStack 2026
      </footer>
    </div>
  );
}

export default App;
