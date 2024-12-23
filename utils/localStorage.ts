// utils/localStorage.ts
export const getFavorites = (): string[] => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const addFavorite = (id: string) => {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: string) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav !== id);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const isFavorite = (id: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(id);
};
