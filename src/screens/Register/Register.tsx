import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Grid from "@mui/material/Unstable_Grid2";
import { register_user } from "../../api/auth";
import Spacer from "../../components/ui-kit/Spacer";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const initValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Register = () => {
  const history = useNavigate();
  const onSubmit = async (values: any) => {
    try {
      const result = await register_user(values);
      console.log(result);
      history("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ padding: "1rem", boxSizing: "border-box" }}>
      <Typography variant={"h2"}>Register</Typography>
      <Spacer amount={2} />
      <Formik
        validationSchema={validationSchema}
        initialValues={initValues}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField
                  name={"username"}
                  label={"Username"}
                  value={values.username}
                  fullWidth
                  variant={"filled"}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  name={"password"}
                  label={"Password"}
                  value={values.password}
                  fullWidth
                  variant={"filled"}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.username}
                />
              </Grid>
              <Grid xs={12}>
                <Spacer amount={2} />
                <Button type={"submit"}>Register</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
