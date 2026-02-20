import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { Main } from './layout/main';
import { Movie } from './componets/MovieDetail';
import { TopMovies } from './componets/TopMovies';


import { LangProvider } from './services/LangContext'; 

function App() {
  return (
    
    <LangProvider> 
      <Router>
        <div className="app_wrapper">
            <Header />
            <main className="container content">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/top100" element={<TopMovies />} />
                <Route path="/movie/:id" element={<Movie />} />
              </Routes>
            </main>
            <Footer />
        </div>
      </Router>
    </LangProvider>
  );
}

export default App;