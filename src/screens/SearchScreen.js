import React from "react";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";

const Container = styled.div`
  display: block;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const options = ["test"];

export default function SearchScreen() {
  return (
    <Container>
      <Autocomplete
        style={{ maxWidth: 400 }}
        renderInput={(params) => <TextField {...params} />}
        options={options}
      />
    </Container>
  );
}
