import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
<div className="pl-[57px] pr-[34px] font-aeroport font-light text-[14px]">
          <ul className=''>
            <li className='pt-[15.5px] pb-[15.5px] pl-[19px] w-[200px]'>Main page</li>
            <li className='pt-[15.5px] pb-[15.5px] pl-[19px] w-[200px]'> <Link  to="/" className="" > Projects</Link></li>
            <li className='pt-[15.5px] pb-[15.5px] pl-[19px] w-[200px]'>Vacancies</li>
            <li className='pt-[15.5px] pb-[15.5px] pl-[19px] w-[200px]'>People</li>
            <li className='pt-[15.5px] pb-[15.5px] pl-[19px] w-[200px]'>Tests</li>
            <li className='pt-[15.5px] pb-[15.5px] pl-[19px] w-[200px]'>Settings</li>
          </ul>
      </div>
      
      
    );
  }
  
  export default Sidebar;
  