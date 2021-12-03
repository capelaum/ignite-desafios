import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import { FiCheckSquare } from "react-icons/fi";

import { useFoods } from "../../hooks/useFoods";

import { Form } from "./styles";

interface ModalEditFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const ModalEditFood = ({
  isOpen,
  onRequestClose,
}: ModalEditFoodProps) => {
  const { food, editFood } = useFoods();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(food.name);
    setImage(food.image);
    setPrice(food.price);
    setDescription(food.description);
  }, [food]);

  async function handleEditFood(event: FormEvent) {
    event.preventDefault();

    editFood({
      name,
      price,
      image,
      description,
      id: food.id,
      available: food.available,
    });

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Form onSubmit={handleEditFood}>
        <h1>Editar Prato</h1>
        <input
          name="name"
          placeholder="Ex: Moda Italiana"
          required
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <input
          name="image"
          placeholder="Cole o link aqui"
          required
          value={image}
          onChange={event => setImage(event.target.value)}
        />

        <input
          name="price"
          placeholder="Ex: 19.90"
          required
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <input
          name="description"
          placeholder="Descrição"
          required
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
