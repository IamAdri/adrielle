import MainHeading from "../_components/MainHeading";
import OverlayOnHover from "../_components/OverlayOnHover";

function Page() {
  return (
    <div>
      <MainHeading>New Collection</MainHeading>
      <div className="grid grid-flow-col justify-center gap-10 mt-25">
        <OverlayOnHover
          category="shoes"
          srcName="shoes"
          alt="A pair of heels shoes"
        />
        <OverlayOnHover
          category="accessories"
          srcName="accessories"
          alt="A pair of sandals"
        />
      </div>
    </div>
  );
}

export default Page;
