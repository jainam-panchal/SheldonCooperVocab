import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Dictionary from "./components/Dictionary";
import './index.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dictionary />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;