
import classes from "./Available.module.css";
import Card from "../UI/Card";
import FoodItem from "./SingleFoodItem/FoodItem";

const TEMPLATE_MEALS = [
  {
    id: 'm1',
    name: 'Canoli',
    description: 'Best canoli ever!',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Pasta',
    description: 'Best pasta ever!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Rissoto',
    description: 'Best rissoto ever!',
    price: 12.99,
  },
  {
    id: 'Gelatto',
    name: 'Green Bowl',
    description: 'Best gelatto ever!',
    price: 18.99,
  },
];

const Available = () => {

  return (
    <>
      <section className={classes.meals}>
        <Card>
          <ul>
            {
              TEMPLATE_MEALS.map((meal) => (
                <FoodItem 
                  id={meal.id}
                  key={meal.id} 
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
            ))}
          </ul>
        </Card>
      </section>
    </>
  )
}

export default Available;
