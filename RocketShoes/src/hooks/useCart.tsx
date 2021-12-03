import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      // faz uma copia do cart
      const updatedCart = cart.map(product => ({ ...product }));

      const productExists = updatedCart.find(
        product => product.id === productId
      );

      const stockAmount = await api
        .get(`stock/${productId}`)
        .then(response => response.data.amount);

      // incrementa quantidade do produto no carrinho
      const amount = productExists ? productExists.amount + 1 : 1;

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      if (productExists) {
        // updatedCart ja eh atualizado
        productExists.amount = amount;
      }

      if (!productExists) {
        // tem q buscar produto na API
        const product = await api
          .get(`products/${productId}`)
          .then(response => response.data);

        const newProduct = {
          ...product,
          amount,
        };

        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = cart.map(product => ({ ...product }));
      const productIndex = updatedCart.findIndex(
        product => product.id === productId
      );

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
      } else {
        throw Error(); // Caso nao encontre o produto no cart
      }
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) return;

      const stockAmount = await api
        .get(`stock/${productId}`)
        .then(response => response.data.amount);

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const updatedCart = cart.map(product => ({ ...product }));
      const productExists = updatedCart.find(
        product => product.id === productId
      );

      if (productExists) {
        // updatedCart ja eh atualizado
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(updatedCart));
      }

      // nao pode alterar quantidade de produto no carrinho q nao existe!
      if (!productExists) {
        throw Error();
      }
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
