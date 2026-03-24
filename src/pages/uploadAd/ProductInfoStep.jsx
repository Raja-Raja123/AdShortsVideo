import { useState } from "react";
import useCategories from "../../hooks/useCategories";

export default function ProductInfoStep({ setProduct, nextStep }) {

  const { categories, loading } = useCategories();

  const [form,setForm] = useState({
    title:"",
    price:"",
    location:"",
    category_id:"",
    description:""
  });

  const [errors,setErrors] = useState({});

  const validate = () => {

    let err = {};

    if(!form.title.trim())
      err.title = "Product title is required";

    if(!form.price)
      err.price = "Price is required";

    if(form.price && isNaN(form.price))
      err.price = "Price must be a number";

    if(!form.location.trim())
      err.location = "Location is required";

    if(!form.category_id)
      err.category = "Please select a category";

    setErrors(err);

    return Object.keys(err).length === 0;

  };

  const handleChange = (e) => {

    const updated = {
      ...form,
      [e.target.name]: e.target.value
    };

    setForm(updated);
    setProduct(updated);

  };

  const handleNext = () => {

    if(validate()){
      nextStep();
    }

  };

  return(

  <div className="space-y-6 p-2 w-lg">

    <h2 className="text-xl font-semibold">
      Basic Product Information
    </h2>

    {/* TITLE */}

    <div>

      <input
        name="title"
        placeholder="Product title (Example: iPhone 13 Pro 128GB)"
        onChange={handleChange}
        className="border p-3 rounded w-full"
      />

      {errors.title && (
        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
      )}

    </div>

    {/* CATEGORY */}

    <div>

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full
        bg-background
        text-foreground
        border
        border-border
        rounded-md
        px-3
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-ring"
      >

        <option value="">
          {loading ? "Loading categories..." : "Select Product Category"}
        </option>

        {categories.map((cat)=>(
          <option key={cat.id} value={cat.id} className="bg-background text-foreground">
            {cat.name}
          </option>
        ))}

      </select>

      {errors.category && (
        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
      )}

    </div>

    {/* PRICE + LOCATION */}

    <div className="grid sm:grid-cols-1 gap-4">

      <div>

        <input
          name="price"
          placeholder="Price (₹)"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}

      </div>

      <div>

        <input
          name="location"
          placeholder="Location (City / Area)"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}

      </div>

    </div>

    {/* DESCRIPTION */}

    <div>

      <label className="text-sm text-gray-600">
        Product Features
      </label>

      <textarea
        name="description"
        rows={4}
        placeholder={`Example:
Brand: Apple
Storage: 128GB
Condition: Like New`}
        onChange={handleChange}
        className="border p-5 rounded w-full h-50 mt-1 hide-scrollbar"
      />

    </div>

    {/* BUTTON */}

    <button
      onClick={handleNext}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded w-full sm:w-auto"
    >
      Save & Continue
    </button>

  </div>

  );

}