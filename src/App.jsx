import './App.css';
import Header from './assets/components/Header/Header';
import Footer from './assets/components/Header/Footer';
import './assets/components/css/bootstrap.css';
import './assets/components/css/styles.css';
import CombinedComponent from './assets/components/Header/CombinedComponent';
import Iphone from './components/Iphone';
import ProductDetail from './components/ProductDetail';
import Watch from './assets/components/pages/watch/Watch';
import Tv from './assets/components/pages/tv/Tv';
import Support from './assets/components/pages/support/Support';
import Mac from './assets/components/pages/mac/Mac';
import Ipad from './assets/components/pages/ipad/Ipad';
import Music from './assets/components/pages/music/Music';
import Four0Four from './assets/components/pages/404/Four0Four';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/Apple-Clone/' element={<CombinedComponent />} />
        <Route path="/iphones" element={<Iphone />} /> {/* Correct Route */}
        <Route path="/iphones/:id" element={<ProductDetail />} /> {/* Dynamic Route */}
        <Route path="/watch" element={<Watch />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/music" element={<Music />} />
        <Route path="/support" element={<Support />} />
        <Route path="/mac" element={<Mac />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="*" element={<Four0Four />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
