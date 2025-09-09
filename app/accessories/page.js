import OverlayOnHover from "../_components/OverlayOnHover";

export const metadata = {
  title: "Accessories",
};

function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Accessories</h1>
      <div className="grid grid-flow-col justify-center gap-10 mt-15">
        <OverlayOnHover category="accessories" srcName="bags" alt="A bag" />
        <OverlayOnHover category="accessories" srcName="belts" alt="A belt" />
        <OverlayOnHover
          category="newCollection"
          srcName="newCollection"
          alt="New collection shoes"
        />
      </div>
    </div>
  );
}

export default Page;
