import "./MenuManagenent.css";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

// Compression function
async function compressImage(file) {
    const bitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");

    const maxSize = 800;
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));

    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext("2d");

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    bitmap.close();

    return canvas.toDataURL("image/jpeg", 0.7);
}

function MenuManagenent() {
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        category: "",
        image: null,
    });

    const [editId, setEditId] = useState(null);

    const { menuFoods, setMenuFoods } = useContext(CartContext);

    const [searchFood, setSearchFood] = useState("");
    const [filterCategory, setFilterCayegory] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");

    const handleAddFood = (e) => {
        e.preventDefault();

        if (!foodData.name.trim() || !foodData.price || !foodData.category || !foodData.image) {
            alert("Please fill all fields");
            return;
        }

        if (editId !== null) {
            // Existing food update
            setMenuFoods((prevFoods) => prevFoods.map((food) => food.id === editId ? { ...foodData, id: editId, price: Number(foodData.price), isAvailable: food.isAvailable ?? true, } : food));
        } else {
            // New food add
            setMenuFoods((prevFoods) => [
                ...prevFoods, {
                    ...foodData, id: Date.now(), price: Number(foodData.price), isAvailable: true,
                },
            ]);
        }
        setFoodData({
            name: "",
            price: "",
            category: "",
            image: null,
        });

        setEditId(null);
    };

    const filterFoods = menuFoods.filter((food) => {
        const matchSearch = food.name.toLowerCase().includes(searchFood.toLowerCase());
        const matchCategory = filterCategory === "All" || food.category === filterCategory;
        const matchStatus = filterStatus === "All" || (filterStatus === "Available" && food.isAvailable !== false) || (filterStatus === "Unavailable" && food.isAvailable === false);
        return matchSearch && matchCategory && matchStatus;
    });

    return (
        <div className="menu-management">
            <h1>Menu Management</h1>

            <form
                className="add-food-form"
                onSubmit={handleAddFood} >
                <h2>Add New Food</h2>

                <input
                    type="text"
                    placeholder="Food Name"
                    value={foodData.name}
                    onChange={(e) => setFoodData({ ...foodData, name: e.target.value })} />

                <input
                    type="number"
                    placeholder="Food Price"
                    value={foodData.price}
                    onChange={(e) => setFoodData({ ...foodData, price: e.target.value })}
                />

                <select
                    value={foodData.category}
                    onChange={(e) => setFoodData({ ...foodData, category: e.target.value })} >

                    <option value="" disabled>Select Category</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                        const file = e.target.files[0];

                        if (!file) return;

                        const compressedImage = await compressImage(file);
                        console.log(compressedImage.slice(0, 50));


                        setFoodData((prev) => ({
                            ...prev, image: compressedImage,
                        }));
                    }}
                />

                <button type="submit"> {editId !== null ? "Update Food" : "Add Food"}</button>
            </form>

            <div className="food-filters">
                {/* Admin serach input */}
                <input
                    type="text"
                    placeholder="Search Food..."
                    value={searchFood}
                    onChange={(e) => setSearchFood(e.target.value)}
                />

                <select value={filterCategory} onChange={(e) => setFilterCayegory(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Other">Other</option>
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>

                <button onClick={() => {
                    setSearchFood("");
                    setFilterCayegory("All");
                    setFilterStatus("All");
                }}>Clear Filters</button>
            </div>

            <div className="food-list">
                <h2>Food List</h2>

                {filterFoods.map((food) => (
                    <div key={food.id} className="managed-food-card">
                        {typeof food.image === "string" && food.image.startsWith("data:image/") && (
                            <img
                                src={food.image}
                                alt={food.name}
                                width="100"
                            />
                        )}

                        <h3>{food.name}</h3>
                        <p>₹ {food.price}</p>
                        <p>{food.category}</p>
                        <p>Status : {food.isAvailable ? "Available" : "Unavailable"}</p>

                        <button onClick={() => setMenuFoods((prevFoods) =>
                            prevFoods.map((item) => item.id === food.id ? { ...item, isAvailable: !item.isAvailable } : item))}>{food.isAvailable ? "Mark Unavailable" : "Mark Available"}</button>

                        <button onClick={() => {
                            setFoodData({
                                name: food.name,
                                price: food.price,
                                category: food.category,
                                image: food.image,
                            });

                            setEditId(food.id);

                        }}>Edit</button>
                        <button onClick={() => setMenuFoods((prevFoods) => prevFoods.filter((item) => item.id !== food.id))}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuManagenent;