"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { type CoffeeType, useCreateCoffee } from "@/entities/coffee";
import { Button } from "@/shared/ui/button";
import { ButtonSelector } from "@/shared/ui/button-selector";
import { Input, PriceInput } from "@/shared/ui/input";
import { Modal } from "@/shared/ui/modal";
import { useToast } from "@/shared/ui/toast";

import { COFFEE_TYPE_OPTIONS, DEFAULT_FORM_VALUES } from "../model/constants";
import { type CreateCoffeeFormData, createCoffeeSchema } from "../model/schema";

import styles from "./create-coffee-form.module.scss";

interface CreateCoffeeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCoffeeForm({ isOpen, onClose }: CreateCoffeeFormProps) {
  const createCoffee = useCreateCoffee();
  const { showToast } = useToast();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateCoffeeFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(createCoffeeSchema),
  });

  const handleDiscard = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateCoffeeFormData) => {
    try {
      await createCoffee.mutateAsync(data);
      reset();
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create coffee";
      showToast(message, "error");
      reset();
      onClose();
    }
  };

  const isSubmitting = createCoffee.isPending;

  return (
    <Modal isOpen={isOpen} onClose={handleDiscard} title="Create New">
      <div className={styles.sprite}></div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <Input
            className={styles.col}
            label="Name"
            placeholder="Name your coffee here"
            error={errors.name?.message}
            {...register("name")}
          />
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <PriceInput
                className={styles.col}
                label="Price"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
        <Controller
          name="type"
          control={control}
          render={({ field, fieldState }) => (
            <ButtonSelector
              label="Type"
              options={COFFEE_TYPE_OPTIONS}
              value={field.value as CoffeeType}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Input
          label="Upload Image"
          placeholder="Paste image URL here"
          error={errors.imageUrl?.message}
          {...register("imageUrl")}
        />
        <Input
          label="Description"
          placeholder="Add a description"
          error={errors.description?.message}
          {...register("description")}
        />
        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            onClick={handleDiscard}
            disabled={isSubmitting}
          >
            Discard
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Confirm"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
