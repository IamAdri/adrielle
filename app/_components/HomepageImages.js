import OverlayOnHover from "./OverlayOnHover";

function HomepageImages() {
  return (
    <div>
      <div className="p-10 flex justify-center">
        <OverlayOnHover
          category="newCollection"
          width={1350}
          height={1350}
          alt="An elegant pair of heels."
        />
      </div>
      <div className="flex flex-wrap justify-center gap-5 mx-10">
        <OverlayOnHover
          category="shoes"
          srcName="heels"
          alt="A pair of heels shoes"
        />

        <OverlayOnHover category="accessories" srcName="bags" alt="A bag" />
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
        <OverlayOnHover category="accessories" srcName="belts" alt="A belt" />
      </div>
    </div>
  );
}

export default HomepageImages;
