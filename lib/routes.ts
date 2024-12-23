// src/lib/routes.ts
const routes = {
  home: "/",
  accommodations: "/accommodations",
  accommodationDetails: (id: string) => `/accommodations/${id}`,
};

export default routes;
