import React from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Nav } from "./components/Nav";
import { TheoryList } from "./components/TheoryList";

function App() {
    return (
        <div>
            <Nav />
            <TheoryList />
        </div>
    );
}

export default App;
