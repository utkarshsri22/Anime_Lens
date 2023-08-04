import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Gallery = React.lazy(()=> import('./Components/Gallery/Gallery'));
const FetchComponent = React.lazy(()=> import('./Components/fetchComponent/FetchComponent'));
const HomePage =React.lazy(() => import('./Components/Homepage/HomePage.jsx'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          <Route path="/" element={<React.Suspense 
            fallback={<h1>Loading...</h1>}
          >
              <HomePage/>
          </React.Suspense>}/>


          <Route path="/anime/:id" element={<React.Suspense 
            fallback={<h1>Loading...</h1>}
          >
              <FetchComponent/>
          </React.Suspense>}/>


          <Route path="/character/:id" element={<React.Suspense 
            fallback={<h1>Loading...</h1>}
          >
              <Gallery/>
          </React.Suspense>}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
