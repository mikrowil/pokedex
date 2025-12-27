import React, { useRef, useState } from "react";
import Typography from "../ui-kit/Typography";
import { useNavigate } from "react-router-dom";
import RegisterModal from "./widgets/register-modal";

export default function Header() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <div className={"box-border p-4"}>
      <div
        style={{
          display: "inline-block",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <Typography variant={"h3"} className={"letter-spacing-12"}>
          Pokedex
        </Typography>
      </div>
      <RegisterModal
        anchor={anchorRef}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
