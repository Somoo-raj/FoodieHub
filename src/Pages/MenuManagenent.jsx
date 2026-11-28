import "./MenuManagenent.css";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function MenuManagenent() {
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        category: "",
        image: null,
    });

    const [editId, setEditId] = useState(null);

    const { menuFoods, setMenuFoods } = useContext(CartContext);

    const handleAddFood = (e) => {
        e.preventDefault();

        if (!foodData.name.trim() || !foodData.price || !foodData.category || !foodData.image) {
            alert("Please fill all fields");
            return;
        }

        if (editId !== null) {
            // Existing food update
            setMenuFoods((prevFoods) => prevFoods.map((food) => food.id === editId ? { ...foodData, id: editId, price: Number(foodData.price) } : food));
        } else {
            // New food add
            setMenuFoods((prevFoods) => [
                ...prevFoods, {
                    ...foodData, id: Date.now(), price: Number(foodData.price),
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
                    onChange={(e) => {
                        const file = e.target.files[0];

                        if (!file) return;

                        const reader = new FileReader();

                        reader.onloadend = () => {
                            setFoodData({ ...foodData, image: reader.result, });
                        };

                        reader.readAsDataURL(file);
                    }}
                />

                <button type="submit"> {editId !== null ? "Update Food" : "Add Food"}</button>
            </form>

            <div className="food-list">
                <h2>Food List</h2>

                {menuFoods.map((food) => (
                    <div key={food.id} className="managed-food-card">
                        {food.image && (
                            <img
                                src={food.image}
                                alt={food.name}
                                width="100"
                            />
                        )}

                        <h3>{food.name}</h3>
                        <p>₹ {food.price}</p>
                        <p>{food.category}</p>

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