import { FormEvent, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import Modal from "react-modal";

import { useFoods } from "../../hooks/useFoods";
import { Form } from "./styles";

interface ModalAddFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const ModalAddFood = ({ isOpen, onRequestClose }: ModalAddFoodProps) => {
  const { createFood } = useFoods();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreateFood(event: FormEvent) {
    event.preventDefault();

    await createFood({
      name,
      image,
      price,
      description
    });

    //reset values
    setName("");
    setImage("");
    setPrice("");
    setDescription("");

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Form onSubmit={handleCreateFood}>
        <h1>Novo Prato</h1>

        <input
          name="name"
          placeholder="Nome"
          required
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <input
          name="image"
          placeholder="Link da imagem"
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

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
