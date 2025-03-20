// useSearch.js
const useSearch = (halls, locations, categories, searchTerm) => {
  return halls.filter((hall) => {
    const location = locations[hall.locationId] || '';
    const category = categories[hall.categoryId] || '';
    const name = hall.name || '';

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Check if searchTerm matches any of these fields
    return (
      name.toLowerCase().includes(lowerSearchTerm) ||
      location.toLowerCase().includes(lowerSearchTerm) ||
      category.toLowerCase().includes(lowerSearchTerm)
    );
  });
};

export default useSearch;
