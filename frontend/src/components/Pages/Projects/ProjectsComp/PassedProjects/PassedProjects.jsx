import PassedComp from './PassedComp';
import PassedTittle from './PassedTittle';

function PassedProjects() {
  return (
    <div className="mt-[40px] mb-[150px]">
      <PassedTittle />
      <div className="flex justify-between">
        <PassedComp />
      </div>
    </div>
  );
}

export default PassedProjects;
