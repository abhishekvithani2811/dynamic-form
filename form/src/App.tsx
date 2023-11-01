import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './componant/header';
import FormBuilder from './modual/FormBuilder';
import FormBuilderComponent from './modual/FormBuilderComponent';
import Setting from './modual/setting';
import ShowResponse from './modual/showResonse';
// import Footer from './componant/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<FormBuilder />}></Route>
          <Route path="/view" element={<FormBuilderComponent />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/show_res" element={<ShowResponse />}></Route>
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
