import { useNavigate } from "react-router-dom";
import { useState } from "react";
import foodData from "../data/foods";
import FoodCard from "../components/FoodCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filteredFood = foodData.filter((food) => {
        const matchCategory = category === "All" || food.category === category;
        const matchSearch = food.name.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <>
            <section className="hero-section">
                <h1>Delicious Food, Delivered Fast</h1>
                <p>Fresh, tasty meals delivered straight to your door.</p>
                <button onClick={() => navigate("/menu")}>Order Now</button>
            </section>

            <section className="popular-dishes">
                <h2>Popular Dishes</h2>

                <SearchBar search={search} setSearch={setSearch} />
                <CategoryFilter selectedCategory={category} setSelectedCategory={setCategory} />

                <div className="food-container">
                    {filteredFood.map((food) => (
                        <FoodCard key={food.id} food={food} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home;