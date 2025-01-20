import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import CreateProjects from '../Pages/CreateProjects/CreateProjects';
import ReadyProject from '../Pages/ReadyProject/ReadyProject';

function RouterComponent() {
  return (
    <div className="Router-wrapper">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateProjects />} />
        <Route path="/project/:projectId" element={<ReadyProject />} />
      </Routes>
    </div>
  );
}

export default RouterComponent;
