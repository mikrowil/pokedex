import React, { useMemo } from "react";
import { Form, Formik } from "formik";
import { TextField } from "@mui/material";

const fields = [
  { name: "a", default: "" },
  { name: "b", default: "" },
  { name: "c", default: "" },
  { name: "d", default: "" },
  { name: "e", default: "" },
  { name: "f", default: "" },
  { name: "g", default: "" },
  { name: "h", default: "" },
  { name: "i", default: "" },
  { name: "j", default: "" },
  { name: "k", default: "" },
  { name: "l", default: "" },
  { name: "m", default: "" },
  { name: "n", default: "" },
  { name: "o", default: "" },
  { name: "p", default: "" },
  { name: "q", default: "" },
  { name: "r", default: "" },
  { name: "s", default: "" },
  { name: "t", default: "" },
  { name: "u", default: "" },
  { name: "v", default: "" },
  { name: "w", default: "" },
  { name: "x", default: "" },
  { name: "y", default: "" },
  { name: "z", default: "" },
  { name: "a", default: "" },
  { name: "b", default: "" },
  { name: "c", default: "" },
  { name: "d", default: "" },
  { name: "e", default: "" },
  { name: "f", default: "" },
  { name: "g", default: "" },
  { name: "h", default: "" },
  { name: "i", default: "" },
  { name: "j", default: "" },
  { name: "k", default: "" },
  { name: "l", default: "" },
  { name: "m", default: "" },
  { name: "n", default: "" },
  { name: "o", default: "" },
  { name: "p", default: "" },
  { name: "q", default: "" },
  { name: "r", default: "" },
  { name: "s", default: "" },
  { name: "t", default: "" },
  { name: "u", default: "" },
  { name: "v", default: "" },
  { name: "w", default: "" },
  { name: "x", default: "" },
  { name: "y", default: "" },
  { name: "z", default: "" },
];

const TestForm = () => {
  const initialValues = useMemo(() => {
    const results: { [key: string]: string } = {};
    fields.forEach((field) => {
      results[`${field.name}`] = field.default;
    });

    return results;
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, handleChange }) => {
          return (
            <Form>
              {fields.map((field) => {
                return (
                  <TextField
                    key={field.name}
                    name={field.name}
                    value={values[`${field.name}`]}
                    onChange={handleChange}
                    label={field.name}
                  />
                );
              })}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default TestForm;
