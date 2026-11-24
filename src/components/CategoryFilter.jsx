import "./CategoryFilter.css";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {

    return (
        <div className="category-filter">
            <button onClick={() => setSelectedCategory("All")} className={selectedCategory === "All" ? "active" : ""}>All</button>
            <button onClick={() => setSelectedCategory("Fast Food")} className={selectedCategory === "Fast Food" ? "active" : ""}>Fast Food</button>
            <button onClick={() => setSelectedCategory("Pizza")} className={selectedCategory === "Pizza" ? "active" : ""}>Pizza</button>
            <button onClick={() => setSelectedCategory("Pasta")} className={selectedCategory === "Pasta" ? "active" : ""}>Pasta</button>
        </div>
    )
}

export default CategoryFilter;