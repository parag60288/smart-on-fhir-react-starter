import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Launch from './components/Launch';
import LaunchCallback from './components/LaunchCallback';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/launch" element={<Launch />} />
        <Route path="/launch-callback" element={<LaunchCallback />} />
        <Route path="/" element={
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">SMART on FHIR App</h1>
            <p>Welcome to your SMART on FHIR application!</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
