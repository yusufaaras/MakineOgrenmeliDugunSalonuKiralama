// useSearch.js
const useSearch = (halls, searchTerm) => {
  return halls.filter((hall) => {
    const name = hall.name || '';

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Check if searchTerm matches any of these fields
    return (
      name.toLowerCase().includes(lowerSearchTerm)
    );
  });
};

export default useSearch;
