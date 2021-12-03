import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { useFoods } from "../../hooks/useFoods";

import { api } from "../../services/api";
import { formatPrice } from "../../util/format";

import { Container } from "./styles";
interface FoodProps {
  food: {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
  };
  handleDeleteFood: (foodId: number) => void;
  onOpenEditFoodModal: () => void;
}

export const Food = ({
  food,
  handleDeleteFood,
  onOpenEditFoodModal,
}: FoodProps) => {
  const { setEditFood } = useFoods();
  const [isAvailable, setIsAvailable] = useState(food.available);

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  };

  function setEditFoodModal(foodId: number) {
    setEditFood(foodId);
    onOpenEditFoodModal();
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          <b>{formatPrice(Number(food.price))}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditFoodModal(food.id)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};
