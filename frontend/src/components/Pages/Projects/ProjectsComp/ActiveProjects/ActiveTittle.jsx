import BtnTemp from '../../../../UI/BtnTemp/BtnTemp';

function ActiveTittle() {
  return (
      <div className="flex justify-between mb-[32px]">
        <h1 className="font-aeroport font-medium text-[32px]">
          Active projects
        </h1>
        <BtnTemp to={'/'} text={'Create project'} />
      </div>
  );
}

export default ActiveTittle;
