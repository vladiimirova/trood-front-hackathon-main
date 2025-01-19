import { Route, Routes } from 'react-router-dom';
import Projects from '../Pages/Projects/Projects';
import CreateProjects from '../Pages/CreateProjects/CreateProjects';
import ReadyProject from '../Pages/ReadyProject/ReadyProject';

function RouterComponent() {
  return (
    <div className="Router-wrapper">
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/create" element={<CreateProjects />} />
        <Route path="/project" element={<ReadyProject />} />
      </Routes>
    </div>
  );
}

export default RouterComponent;
