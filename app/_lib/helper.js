export function getCategory(params) {
  const category =
    params.shoesCategory.charAt(0).toUpperCase() +
    params.shoesCategory.slice(1);
  return category;
}
