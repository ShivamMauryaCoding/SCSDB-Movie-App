import Loading from "/Ripple loading animation.gif";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <img width={250} src={Loading} alt="" />
    </div>
  );
}

export default Loader;
