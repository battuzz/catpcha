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
      <img className="nyancat-image" src="images/nyancat.svg"></img>

      <div className="image-overlay">

        {
          askForUsername ? <UsernameForm />
            : <Button variant="contained" className="play-button" onClick={onPlayButtonClicked}>
              Play
            </Button>
        }
      </div>

    </div>
  );
}