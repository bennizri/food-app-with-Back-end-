import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoding(true);
      const response = await fetch(
        "https://react-https-84d4c-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedMeal = [];

      for (const key in responseData) {
        loadedMeal.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setmeals(loadedMeal);
      setIsLoding(false);
    };
    fetchMeals().catch((error) => {
      setIsLoding(false);
      setHttpError(error.message);
    });
  }, []);
  console.log(meals);
  if (isLoding) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loding...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
