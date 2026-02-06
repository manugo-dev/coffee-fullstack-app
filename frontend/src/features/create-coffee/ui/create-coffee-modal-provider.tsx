"use client";

import { createContext, useCallback, useContext, useState } from "react";

import { CreateCoffeeForm } from "./create-coffee-form";

interface CreateCoffeeModalContextValue {
  closeModal: () => void;
  isOpen: boolean;
  openModal: () => void;
}

const CreateCoffeeModalContext =
  createContext<CreateCoffeeModalContextValue | null>(null);

export function useCreateCoffeeModal() {
  const context = useContext(CreateCoffeeModalContext);
  if (!context) {
    throw new Error(
      "useCreateCoffeeModal must be used within CreateCoffeeModalProvider",
    );
  }
  return context;
}

interface CreateCoffeeModalProviderProps {
  children: React.ReactNode;
}

export function CreateCoffeeModalProvider({
  children,
}: CreateCoffeeModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <CreateCoffeeModalContext.Provider
      value={{ closeModal, isOpen, openModal }}
    >
      {children}
      <CreateCoffeeForm isOpen={isOpen} onClose={closeModal} />
    </CreateCoffeeModalContext.Provider>
  );
}
