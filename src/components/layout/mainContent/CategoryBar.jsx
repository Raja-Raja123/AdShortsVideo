import React from "react";
import CategoryItem from "./CategoryItem";
import useCategories from "../../../hooks/useCategories";

const CategoryBar = () => {
  const { categories, loading, error } = useCategories();

  if (loading)
    return (
      <div className="py-4 text-gray-400 fixed left-1/2 -translate-x-1/2 top-15">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="py-4 text-red-400 fixed left-1/2 -translate-x-1/2 top-15">
        Error: {error}
      </div>
    );

  return (
    <div
      className="
        fixed top-15
        md:top-0 
        left-0 md:left-20 
        right-0 
        bg-background z-50
        p-2
      "
    >
      {/* Scroll Container */}
      <div className="flex gap-6 px-4 py-1 overflow-x-auto whitespace-nowrap hide-scrollbar">

        {categories.map((category) => (
          <div key={category.id} className="shrink-0">
            <CategoryItem
              image={category.image_url}
              name={category.name}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryBar;