import OverlayOnHover from "../_components/OverlayOnHover";

export const metadata = {
  title: "Accessories",
};

function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Accessories</h1>
      <div className="flex gap-5 mt-15 justify-center">
        <span>SORTING COMPONENT</span>
        <span>Show TYPES of Accessories</span>
      </div>
      <div className="grid grid-flow-col justify-center gap-10 mt-15">
        <OverlayOnHover category="accessories" srcName="bags" alt="A bag" />

        <OverlayOnHover category="accessories" srcName="belts" alt="A belt" />
      </div>
    </div>
  );
}

export default Page;
