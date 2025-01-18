import { Route, Routes } from 'react-router-dom';
import Projects from '../Pages/Projects/Projects.jsx';

function RouterComponent() {
  return (
    <div className="Router-wrapper">
      <Routes>
        <Route path="/" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default RouterComponent;
