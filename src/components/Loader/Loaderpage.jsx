import "../../styles/Loader.css";
function Loaderpage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Loaderpage;
