'use client'

import { useEffect, useState } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Paper, Link } from '@mui/material'
import { Button, Grid, Box } from '@mui/material'
import { useSearchParams } from 'next/navigation'

const Leaderboard = () => {
    const baselines = [
        {
            name: 'Random agent 😎',
            baseline: true,
            score: 1350
        },
        // {
        //     name: 'Baseline #1',
        //     baseline: true,
        //     score: 800
        // },
        // {
        //     name: 'Baseline #2',
        //     baseline: true,
        //     score: 1100
        // },
        {
            name: 'Giorgia Franchini 🐱',
            baseline: true,
            label: 'Miao',
            score: 10000
        },
    ]
    const [leaderboard, setLeaderboard] = useState(baselines)
    const searchParams = useSearchParams();

    const username = searchParams.get('username')

    useEffect(() => {
        var entries = JSON.parse(localStorage.getItem('LEADERBOARD') ?? "[]")
        if (entries === null) {
            entries = []
        }
        let all_entries = entries.concat(baselines)
        all_entries.sort((a: any, b: any) => a.score < b.score ? 1 : -1)
        setLeaderboard(all_entries)
    }, [])

    return (
        <>
            <Grid container alignItems={'center'}>
                <Grid item xs={8}>
                    <h1 className='text-2xl text-white mt-10 mb-6'>Classifica</h1>
                </Grid>
            </Grid>

            <TableContainer className='rounded'>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell align="right"><b>Punteggio</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.map((row, row_i) => (
                            <TableRow
                                key={row.name + '-' + row_i}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 }, 'backgroundColor':
                                        row.baseline ? '#dddddd' : (row.name == username ? '#def440' : '#ffffff')
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.baseline ? <b> {row.name}</b> : row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.baseline ? (row.label ? <b>{row.label}</b> : <b>{row.score}</b>) : row.score}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Link href='/play'>
                <Button variant='contained' className='mt-5 p-4'>Gioca ancora</Button>
            </Link>
        </>
    )
}

export default Leaderboard
