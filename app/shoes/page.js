import MainHeading from "../_components/MainHeading";
import OverlayOnHover from "../_components/OverlayOnHover";

export const metadata = {
  title: "Shoes",
};

function Page() {
  return (
    <div>
      <MainHeading>Shoes</MainHeading>
      <div className="flex gap-5 mt-15 justify-center">
        <span>SORTING COMPONENT</span>
        <span>Show TYPES of SHOES</span>
      </div>
      <div className="grid grid-flow-col justify-center gap-10 mt-15">
        <OverlayOnHover
          category="shoes"
          srcName="heels"
          alt="A pair of heels shoes"
        />

        <OverlayOnHover
          category="shoes"
          srcName="sneakers"
          alt="A pair of sneakers"
        />

        <OverlayOnHover
          category="shoes"
          srcName="sandals"
          alt="A pair of sandals"
        />

        <OverlayOnHover
          category="shoes"
          srcName="flats"
          alt="A pair of flats"
        />
      </div>
    </div>
  );
}

export default Page;
