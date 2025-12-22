export function getCategoryNameForHeading(params) {
  const categoryName = Object.values(params)[0];
  const category = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  return category === "NewCollection" ? "New Collection" : category;
}

export function getCategoryName(params) {
  const categoryName = Object.values(params)[0];
  return categoryName;
}

export function priceWithDiscount(discount, price) {
  return price - (discount !== null ? (price * discount) / 100 : null);
}

export function colorsAvailableFunction(item) {
  const colorsAvailable = Object.keys(item.variants);
  const mainColorImage = item.variants[colorsAvailable[0]][0];
  const secondColorImage = item.variants[colorsAvailable[1]][0];
  const mainColorGallery = item.variants[colorsAvailable[0]];
  const secondColorGallery = item.variants[colorsAvailable[1]];

  const imagesBasedOnColor = {
    colorsAvailable,
    mainColorImage,
    secondColorImage,
    mainColorGallery,
    secondColorGallery,
  };
  return imagesBasedOnColor;
}
