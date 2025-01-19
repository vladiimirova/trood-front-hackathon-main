import BtnTemp from '../../../../UI/BtnTemp/BtnTemp';

function ActiveTittle() {
  return (
      <div className="flex justify-between mb-[32px]">
        <h1 className="font-aeroport font-500 text-[32px]">
          Active projects
        </h1>
        <BtnTemp to={'/create'} text={'Create project'} />
      </div>
  );
}

export default ActiveTittle;
