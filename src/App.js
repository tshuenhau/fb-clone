import "./App.css";
import Button from "@mui/material/Button";
import * as React from "react";
import TopAppBar from "./components/TopAppBar";
import { AuthProvider } from "./contexts/AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as routerLink,
} from "react-router-dom";
import { routes as appRoutes } from "./routes";

function App() {
  // const [value, setValue] = React.useState("map");

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          {" "}
          <TopAppBar />
          <header className="App-header">
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </header>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
