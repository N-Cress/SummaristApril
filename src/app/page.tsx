'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'



export default function Home() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (mounted) {
      router.push('/for-you')
    }
  }, [mounted, router])  
  return <div>Redirecting...</div> 
}
