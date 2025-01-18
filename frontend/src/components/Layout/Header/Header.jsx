import Logo from "./HeaderComp/Logo";
import Menu from "./HeaderComp/Menu";

function Header() {
    return (
      <div className="">
        <header>
        <div className="container m-0 mx-auto"> 
          <div className="flex justify-between pt-[44.5px]">
          <Logo/>
          <Menu/>
          </div>
        </div>
        </header>
       
      </div>
    );
  }
  
  export default Header;
  