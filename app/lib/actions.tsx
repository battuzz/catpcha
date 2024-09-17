'use client'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function startGame(formData: FormData) {
    const username = formData.get('username');

    // revalidatePath('/play')
    redirect(`/play?username=${username}`)
}