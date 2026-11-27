import "./MenuManagenent.css";
import { useState } from "react";

function MenuManagenent() {
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        category: "",
        image: null,
    });

    const [foodList, setFoodList] = useState([]);

    const handleAddFood = (e) => {
        e.preventDefault();

        if (!foodData.name.trim() || !foodData.price || !foodData.category || !foodData.image) {
            alert("Please fill all fields");
            return;
        }

        setFoodList((prevFoods) => [
            ...prevFoods, {
                ...foodData, id: Date.now(), price: Number(foodData.price),
            },
        ]);

        setFoodData({
            name: "",
            price: "",
            category: "",
            image: null,
        });
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
                    onChange={(e) => setFoodData({ ...foodData, image: e.target.files[0] })}
                />

                <button type="submit">Add Food</button>
            </form>

            <div className="food-list">
                <h2>Food List</h2>

                {foodList.map((food) => (
                    <div key={food.id} className="managed-food-card">
                        {food.image && (
                            <img
                                src={URL.createObjectURL(food.image)}
                                alt={food.image}
                                width="100"
                            />
                        )}

                        <h3>{food.name}</h3>
                        <p>₹ {food.price}</p>
                        <p>{food.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuManagenent;