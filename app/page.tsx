"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalLogin } from "@/components/terminal-login"
import { LogicArena } from "@/components/logic-arena"
import { ResultsScreen } from "@/components/results-screen"
import { FeedbackScreen } from "@/components/feedback-screen"

type GamePhase = "login" | "game" | "results" | "feedback"

interface UserData {
  name: string
}

interface GameState {
  score: number
  results: { questionId: number; correct: boolean }[]
}

export default function RemoteNuanceChallenge() {
  const [phase, setPhase] = useState<GamePhase>("login")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [gameState, setGameState] = useState<GameState | null>(null)

  const handleLogin = useCallback((name: string) => {
    setUserData({ name })
    setPhase("game")
  }, [])

  const handleGameComplete = useCallback((results: { questionId: number; correct: boolean }[]) => {
    const correctCount = results.filter((r) => r.correct).length
    const score = Math.round((correctCount / results.length) * 100)
    setGameState({ score, results })
    setPhase("results")
  }, [])

  const handleContinueToFeedback = useCallback(() => {
    setPhase("feedback")
  }, [])

  const handleRestart = useCallback(() => {
    setUserData(null)
    setGameState(null)
    setPhase("login")
  }, [])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-indigo-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-indigo-500/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === "login" && (
            <motion.div
              key="login"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <TerminalLogin onStart={handleLogin} />
            </motion.div>
          )}

          {phase === "game" && userData && (
            <motion.div
              key="game"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Game Header */}
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Session active: {userData.name}</span>
                  </div>
                </div>
              </div>
              
              <LogicArena onComplete={handleGameComplete} />
            </motion.div>
          )}

          {phase === "results" && userData && gameState && (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <ResultsScreen
                name={userData.name}
                score={gameState.score}
                onContinue={handleContinueToFeedback}
              />
            </motion.div>
          )}

          {phase === "feedback" && userData && gameState && (
            <motion.div
              key="feedback"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <FeedbackScreen
                name={userData.name}
                score={gameState.score}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
