import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Form = ({ fields, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} style={{ width: "fit-content", margin: "auto" }}>
      {fields.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={field.value}
          handleChange={field.onChange}
        />
      ))}
      <Button type="submit" text="Submit" />
    </form>
  );
};

export default Form;
