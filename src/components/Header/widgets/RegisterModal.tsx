import React from "react";
import { Form, Formik } from "formik";
import { login } from "../../../api/auth";
import { loginUser } from "../../../manageSession";
import { Button, Menu, TextField } from "@mui/material";

const RegisterModal = ({ anchor, setAnchor }: any) => {
  return (
    <Menu open={Boolean(anchor)} anchorEl={anchor}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const result = await login(values);
          loginUser(result.data);
          setAnchor(null);
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
