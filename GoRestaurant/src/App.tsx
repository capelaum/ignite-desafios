import { useState } from "react";
import Modal from "react-modal";

import { FoodsProvider } from "./hooks/useFoods";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { ModalAddFood } from "./components/ModalAddFood";
import { ModalEditFood } from "./components/ModalEditFood";

import GlobalStyle from "./styles/global";

Modal.setAppElement("#root");

export const App = () => {
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);

  function handleOpenAddFoodModal() {
    setIsAddFoodModalOpen(true);
  }

  function handleCloseAddFoodModal() {
    setIsAddFoodModalOpen(false);
  }

  function handleOpenEditFoodModal() {
    setIsEditFoodModalOpen(true);
  }

  function handleCloseEditFoodModal() {
    setIsEditFoodModalOpen(false);
  }

  return (
    <FoodsProvider>
      <Header onOpenAddFoodModal={handleOpenAddFoodModal} />
      <Dashboard
        onOpenEditFoodModal={handleOpenEditFoodModal}
      />

      <ModalAddFood
        isOpen={isAddFoodModalOpen}
        onRequestClose={handleCloseAddFoodModal}
      />

      <ModalEditFood
        isOpen={isEditFoodModalOpen}
        onRequestClose={handleCloseEditFoodModal}
      />

      <GlobalStyle />
    </FoodsProvider>
  );
};
