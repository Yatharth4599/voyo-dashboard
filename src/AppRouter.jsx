import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import B2BDashboard from './B2BDashboard';

export default function AppRouter() {
  return (
    <Router basename="/dashboard">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/b2b-dashboard" element={<B2BDashboard />} />
      </Routes>
    </Router>
  );
}
