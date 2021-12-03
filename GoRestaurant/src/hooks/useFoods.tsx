import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

type FoodInput = Omit<Food, "id" | "available">;

interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: Food[];
  food: Food;
  createFood: (food: FoodInput) => Promise<void>;
  deleteFood: (foodId: number) => void;
  setEditFood: (foodId: number) => void;
  editFood: (food: Food) => void;
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [food, setFood] = useState<Food>({} as Food);

  useEffect(() => {
    api.get("foods").then(response => setFoods(response.data));
    api.get(`foods/1`).then(response => setFood(response.data));
  }, []);

  async function createFood(foodInput: FoodInput) {
    const addedFood = await api
      .post("foods", {
        ...foodInput,
        available: true,
      })
      .then(response => response.data);

    setFoods([...foods, addedFood]);
  }

  async function deleteFood(foodId: number) {
    const updatedFoods = foods.map(food => ({ ...food }));
    const foodIndex = foods.findIndex((food: Food) => food.id === foodId);

    if (foodIndex >= 0) {
      updatedFoods.splice(foodIndex, 1);
      setFoods(updatedFoods);

      await api.delete(`foods/${foodId}`, {
        params: { id: foodId },
      });
    }
  }

  async function setEditFood(foodId: number) {
    const foodToUpdate = await api
      .get(`foods/${foodId}`)
      .then(response => response.data);

    setFood(foodToUpdate);
  }

  async function editFood(foodUpdated: Food) {
    await api.put(`foods/${foodUpdated.id}`, {
      ...foodUpdated,
    });

    const updatedFoods = foods.map(food => ({ ...food }));
    const foodIndex = updatedFoods.findIndex(
      food => food.id === foodUpdated.id
    );

    updatedFoods[foodIndex] = foodUpdated;
    setFoods(updatedFoods);
  }

  return (
    <FoodsContext.Provider
      value={{ foods, food, createFood, deleteFood, setEditFood, editFood }}
    >
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
}
