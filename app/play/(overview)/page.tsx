'use client'

import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation"
import ImageIcon from "@mui/icons-material/Image"
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useEffect, useState } from "react";

import cat_images from "../../image_database.json"


const MAX_ROUNDS = 3;

export default function CatPlay() {
    const searchParams = useSearchParams();
    const [selectedImages, setSelectedImages] = useState(new Set())
    const [gameState, setGameState] = useState({
        round: 1,
        score: 0,
        isSelecting: true,
        imgLinks: cat_images['cat_images'].toSorted(() => 0.5 - Math.random()).slice(0, 9)
    })

    const username: string = searchParams.get('username') ?? redirect('/');


    const onSelectImage = (index: number) => {
        if (gameState.isSelecting) {
            setSelectedImages(prevSet => {
                console.log(index);
                if (prevSet.has(index)) {
                    prevSet.delete(index);
                }
                else {
                    prevSet.add(index);
                }
                return new Set(prevSet);
            });
        }
    }

    const onConfirmChoice = (e: any) => {
        setGameState({
            ...gameState,
            isSelecting: false,
            score: gameState.score + computeScore()
        });
    }

    const onNextRound = (e: any) => {
        setGameState({
            ...gameState,
            isSelecting: true,
            round: gameState.round + 1,
            imgLinks: cat_images['cat_images'].toSorted(() => 0.5 - Math.random()).slice(0, 9)
        });
        setSelectedImages(new Set());
    }

    const isCorrectSelection = (index: number) => {
        const isSelected = selectedImages.has(index);
        const isGenerated = gameState.imgLinks[index].generated;

        if ((isGenerated && isSelected) || (!isGenerated && !isSelected)) {
            return true;
        }
        else {
            return false;
        }
    }

    const getBorderColorForImage = (index: number) => {
        if (gameState.isSelecting) {
            return selectedImages.has(index)
                ? 'border-4 border-yellow-500'
                : 'p-[4px]'
        }
        else {
            return isCorrectSelection(index)
                ? 'border-4 border-green-500'
                : 'border-4 border-red-500'
        }
    }

    const computeScore = () => {
        let score = 0;
        for (var i = 0; i < 9; i++) {
            if (isCorrectSelection(i)) {
                score += 100;
            }
        }
        return score;
    }

    useEffect(() => {
        if (gameState.round > MAX_ROUNDS) {
            // End game and redirect to leaderboard
            const totalScore = gameState.score;
            const name = username;


            // Update leaderboard
            var leaderboard = JSON.parse(localStorage.getItem('LEADERBOARD') ?? "[]")
            if (leaderboard === null) {
                leaderboard = []
            }
            localStorage.setItem('LEADERBOARD', JSON.stringify(
                [...leaderboard,
                {
                    name: name,
                    score: totalScore
                }]
            ))

            // const updateLeaderboard = async (name, score) => {
            //     const docRef = await addDoc(collection(db, "leaderboard"), {
            //         name: name,
            //         score: score
            //     });
            // }

            // updateLeaderboard(gameState.playerName, score)
            //     .catch(console.error)



            // Save results
            redirect('/leaderboard?username=' + name)
        }
    }, [gameState])



    return (
        <>
            <div className="flex gap-x-6 py-4 md:flex-row-reverse justify-end flex-col text-white">
                <List className="flex flex-row md:flex-col max-h-[5vh] md:max-h-fit m-0 p-0">
                    <ListItem>
                        <ListItemText primary="Username" secondary={username} secondaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Round" secondary={gameState.round} secondaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Punteggio" secondary={gameState.score} secondaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                </List>

                <div className="h-fit">
                    <h1 className="max-h-[5vh] text-2xl"> <b>Seleziona le immagini generate da una IA</b></h1>
                    <div className="grid grid-cols-3  gap-[5px] h-full max-h-[85vh] aspect-square">
                        {gameState.imgLinks.map((img, index) =>
                        (
                            <div key={'div-' + index} className="hover:scale-[1.05] hover:cursor-pointer relative">
                                <img
                                    key={'img-' + index}
                                    src={img.url}
                                    className={
                                        "object-scale-down max-h-full m-0 p-0 "
                                        + getBorderColorForImage(index)
                                    }
                                    onClick={(e) => onSelectImage(index)}>
                                </img>
                                {
                                    gameState.isSelecting ? <></> :
                                        <div className="absolute top-1 left-1 text-lg bg-black p-2">
                                            {img.generated ? "AI" : "Reale"}
                                        </div>
                                }
                            </div>
                        )
                        )}

                        <div className="col-span-3 flex flex-row-reverse max-h-[5vh]">
                            {
                                gameState.isSelecting
                                    ? <Button variant="contained" className="p-5" onClick={onConfirmChoice}>Conferma</Button>
                                    : <Button variant="contained" className="p-5" onClick={onNextRound}>Prossimo round</Button>
                            }
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

