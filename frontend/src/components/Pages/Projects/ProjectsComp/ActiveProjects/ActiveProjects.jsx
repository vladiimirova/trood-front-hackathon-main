import ActiveTittle from './ActiveTittle';
import Analyzing from './Analyzing';
import Creating from './Creating';

function ActiveProjects() {
  return (
    <div className="">
     <ActiveTittle />
     <div className='flex justify-between'>
      <Creating />
      <Analyzing />
     </div>
    </div>
  );
}

export default ActiveProjects;
