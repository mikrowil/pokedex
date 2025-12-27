import React from "react";
import { Form, Formik } from "formik";
import { login } from "../../../api/auth";
import { loginUser } from "../../../manageSession";
import { Button, Menu, TextField } from "@mui/material";

const RegisterModal = ({
  anchor,
  open,
  onClose,
}: {
  anchor: React.RefObject<HTMLElement>;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Menu open={open} anchorEl={anchor.current as HTMLElement}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const result = await login(values);
          loginUser(result.data);
          onClose();
        }}
      >
        {(formikProps) => (
          <Form>
            <TextField
              label={"Username"}
              name={"username"}
              value={formikProps.values.username}
              onChange={formikProps.handleChange}
              fullWidth
            />
            <TextField
              label={"Password"}
              name={"password"}
              value={formikProps.values.password}
              onChange={formikProps.handleChange}
              fullWidth
            />
            <Button type={"submit"}>Submit</Button>
          </Form>
        )}
      </Formik>
    </Menu>
  );
};

export default RegisterModal;
