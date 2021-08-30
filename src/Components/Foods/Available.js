
import { useEffect, useState } from "react";

import classes from "./Available.module.css";
import Card from "../UI/Card";
import FoodItem from "./SingleFoodItem/FoodItem"; 

const Available = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const fetchfoods = async () => {
      const response = await fetch("https://food-app-6818d-default-rtdb.firebaseio.com/meals.json");
      const data = await response.json();

      const loadedmenu = [];

      for (const key in data) {
        loadedmenu.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      };
      setFoods(loadedmenu);
      setLoading(false);
    };
    fetchfoods();
  }, []);

  if (loading) {
    return (
      <section className={classes.loading}>
        <h3>Loading...</h3>
      </section>
    )
  };

  return (
    <>
      <section className={classes.meals}>
        <Card>
          <ul>
            {
              foods.map((meal) => (
                <FoodItem 
                  id={meal.id}
                  key={meal.id} 
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              ))
            }
          </ul>
        </Card>
      </section>
    </>
  )
}

export default Available;
