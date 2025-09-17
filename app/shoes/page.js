import MainHeading from "../_components/MainHeading";
import OverlayOnHover from "../_components/OverlayOnHover";

export const metadata = {
  title: "Shoes",
};

function Page() {
  return (
    <div className="mt-5">
      <MainHeading>Shoes</MainHeading>
      <div className="flex justify-center gap-10 mt-25 flex-wrap">
        <OverlayOnHover
          category="shoes"
          srcName="heels"
          alt="A pair of heels shoes"
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
