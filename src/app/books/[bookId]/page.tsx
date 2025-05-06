'use client'

import { useParams } from "next/navigation"

export default function BookPage() {
    const params = useParams()
    const bookId = params.bookId

    return(
        <div> Viewing Book: {bookId}</div>
    )
}