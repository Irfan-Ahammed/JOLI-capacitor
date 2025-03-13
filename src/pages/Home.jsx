import ThemeToggle from '@/components/ThemeToggle'
import React from 'react'

function Home() {
  return (
    <div className="bg-light-background text-light-foreground dark:bg-dark-background dark:text-dark-foreground min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-poppins font-bold">Welcome to Joli</h1>
      <p className="text-lg text-light-muted dark:text-dark-muted mt-4">Find and apply for jobs easily.</p>
      
      <div className="mt-6 p-6 border border-light-border dark:border-dark-border rounded-lg bg-light-secondary dark:bg-dark-secondary shadow-md">
        <p className="text-light-primary dark:text-dark-primary text-xl font-medium">Empowering Job Seekers</p>
      </div>
      
      <div className="mt-6">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Home;