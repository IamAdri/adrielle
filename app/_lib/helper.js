export function getCategoryNameForHeading(params) {
  const categoryName = Object.values(params)[0];
  const category = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  return category;
}

export function getCategoryName(params) {
  //console.log(params);
  //return Object.values(params)[0];
  const categoryName = Object.values(params)[0];
  return categoryName;
}
