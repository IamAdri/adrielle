export function getCategory(params) {
  const categoryName = Object.values(params)[0];
  console.log(categoryName);
  const category = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  return category;
}
