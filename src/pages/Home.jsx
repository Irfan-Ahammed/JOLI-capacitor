import Header from '@/components/Header';
import React from 'react'

function Home() {
  return (
    <div className="bg-light-background px-3 text-light-foreground dark:bg-black dark:text-dark-foreground min-h-screen flex flex-col items-center justify-center p-8">
      <Header />
    </div>
  )
}

export default Home;