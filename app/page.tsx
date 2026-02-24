'use client'

import { Button, Link } from "@mui/material";
import UsernameForm from "./ui/name-prompt";
import { useState } from "react";

function Header({ title }: { title: string }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}





export default function HomePage() {
  const [askForUsername, setAskForUsername] = useState(false);
  function onPlayButtonClicked(event: any): void {
    setAskForUsername(true);
  }

  return (
    <div>
      <img className="nyancat-image" src="images/nyancat.svg" style={{ margin: "0 auto" }}></img>

      <div className="image-overlay">

        {
          askForUsername ? <UsernameForm />
            : <Button variant="contained" style={{ padding: "1rem 2rem", display: "block", margin: "0 auto" }} onClick={onPlayButtonClicked}>
              Play
            </Button>
        }
      </div>

    </div>
  );
}