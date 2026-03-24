import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/api/axios";
const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {

        const res = await api.get("/public/categories");
        setCategories(res.data.data || res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  console.log(categories);
  return { categories, loading, error };
};

export default useCategories;
