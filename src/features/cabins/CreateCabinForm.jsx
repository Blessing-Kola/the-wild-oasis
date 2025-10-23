import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { name, maxCapacity, regularPrice, discount, description, image } =
    newCabin;

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    // console.log(data);
    mutate(data);
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: " field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        {/* <Label htmlFor="maxCapacity">Maximum capacity</Label> */}
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: " field is required",
            min: {
              value: 1,
              message: "Minimum capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        {/* <Label htmlFor="regularPrice">Regular price</Label> */}
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: " field is required",
            min: {
              value: 1,
              message: "Minimum capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        {/* <Label htmlFor="discount">Discount</Label> */}
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: " field is required",
            validate: (value) =>
              parseInt(value) <= getValues().regularPrice ||
              "Discount cannot be more than regular price ",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        {/* <Label htmlFor="description">Description for website</Label> */}
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: " field is required",
          })}
        />
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput
          id="image"
          type="file"
          {...register("image", { required: "This field is required" })}
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button
          variation="primary"
          size="medium"
          disabled={isCreating}
          type="submit"
        >
          Edit cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
