import Notfounding from "/Notfound.gif";

function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <img width={250} src={Notfounding} alt="" />
    </div>
  );
}
export default Notfound;
