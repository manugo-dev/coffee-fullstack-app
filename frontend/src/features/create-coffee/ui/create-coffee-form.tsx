"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateCoffee, type CoffeeType } from "@/entities/coffee";
import { Modal } from "@/shared/ui/modal";
import { Input } from "@/shared/ui/input";
import { ButtonSelector } from "@/shared/ui/button-selector";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/toast";

import { createCoffeeSchema, type CreateCoffeeFormData } from "../model/schema";
import { COFFEE_TYPE_OPTIONS, DEFAULT_FORM_VALUES } from "../model/constants";
import styles from "./create-coffee-form.module.scss";

interface CreateCoffeeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCoffeeForm({ isOpen, onClose }: CreateCoffeeFormProps) {
  const createCoffee = useCreateCoffee();
  const { showToast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCoffeeFormData>({
    resolver: yupResolver(createCoffeeSchema),
    defaultValues: DEFAULT_FORM_VALUES,
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
          <Input
            className={styles.col}
            label="Price"
            type="number"
            placeholder="000"
            min={0}
            step={0.01}
            suffix="€"
            error={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
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
