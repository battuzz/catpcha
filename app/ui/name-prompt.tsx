'use client'

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { startGame } from '@/app/lib/actions';
import { redirect } from 'next/navigation';
import { Button, Input } from '@mui/material';



export default function UsernameForm() {
    return (
        <form action={startGame}>
            <div className="rounded-md w-full px-4 md:px-6 flex flex-row text-lg">
                <fieldset className='text-lg flex w-full'>
                    <Input
                        id='username-form'
                        name='username'
                        type='string'
                        placeholder='Username'
                        autoFocus={true}
                        sx={{ background: 'white' }}
                        className='box-content rounded-md border border-gray-200 outline-2 placeholder:text-gray-500 pl-10 py-4 flex-grow background-white'
                    ></Input>
                    <Button variant='contained' type='submit' className='box-content py-4 px-6 ml-4 text-lg'>COMINCIA!</Button>
                </fieldset>
            </div>
        </form >
    );
}
