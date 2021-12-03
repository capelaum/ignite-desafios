
import { Food } from "../../components/Food";
import { useFoods } from "../../hooks/useFoods";

import { FoodsContainer } from "./styles";

interface DashboardProps {
  onOpenEditFoodModal: () => void;
}

export const Dashboard = ({ onOpenEditFoodModal }: DashboardProps) => {
  const { foods, deleteFood } = useFoods();

  return (
    <FoodsContainer data-testid="foods-list">
      {foods &&
        foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleDeleteFood={() => deleteFood(food.id)}
            onOpenEditFoodModal={onOpenEditFoodModal}
          />
        ))}
    </FoodsContainer>
  );
};
