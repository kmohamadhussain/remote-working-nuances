"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Check, X, Zap, Flame } from "lucide-react"
import confetti from "canvas-confetti"
import { getQuestions, type Question } from "@/lib/game-data"
import { NuanceModal } from "./nuance-modal"

interface LogicArenaProps {
  onComplete: (results: { questionId: number; correct: boolean }[]) => void
}

interface DropZoneProps {
  type: "green" | "red"
  isHovered: boolean
  onDrop: () => void
  onHover: (hovering: boolean) => void
}

function DropZone({ type, isHovered, onDrop, onHover }: DropZoneProps) {
  const isGreen = type === "green"
  
  return (
    <motion.div
      className={`
        relative flex-1 min-h-\[140px\] rounded-lg border-2 border-dashed
        flex flex-col items-center justify-center gap-2 p-4
        transition-all duration-300 cursor-pointer
        ${isGreen 
          ? `border-emerald-500/50 bg-emerald-500/10 ${isHovered ? 'border-emerald-400 bg-emerald-500/20 scale-105' : ''}` 
          : `border-rose-500/50 bg-rose-500/10 ${isHovered ? 'border-rose-400 bg-rose-500/20 scale-105' : ''}`
        }
      `}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onDrop}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${isGreen ? 'bg-emerald-500/20' : 'bg-rose-500/20'}
      `}>
        {isGreen ? (
          <Zap className="w-6 h-6 text-emerald-400" />
        ) : (
          <Flame className="w-6 h-6 text-rose-400" />
        )}
      </div>
      <div className="text-center">
        <p className={`text-sm font-bold ${isGreen ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isGreen ? 'Sustainable Habit' : 'Burnout Alert'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {isGreen ? 'This habit helps me thrive' : 'This habit leads to burnout'}
        </p>
      </div>
    </motion.div>
  )
}

interface DraggableCardProps {
  question: Question
  onDragEnd: (zone: "green" | "red") => void
  greenHovered: boolean
  redHovered: boolean
  setGreenHovered: (h: boolean) => void
  setRedHovered: (h: boolean) => void
  isDragging: boolean
  setIsDragging: (d: boolean) => void
}

function DraggableCard({ 
  question, 
  onDragEnd, 
  greenHovered, 
  redHovered,
  setGreenHovered,
  setRedHovered,
  isDragging,
  setIsDragging
}: DraggableCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      style={{ x, y, rotateX, rotateY }}
      className="cursor-grab active:cursor-grabbing perspective-1000"
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        const threshold = 100
        if (info.offset.y > threshold) {
          // Dropped toward bottom - check horizontal position
          if (info.offset.x > 50) {
            setGreenHovered(false)
            onDragEnd("green")
          } else if (info.offset.x < -50) {
            setRedHovered(false)
            onDragEnd("red")
          }
        }
      }}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className={`
        relative p-6 rounded-lg border-2 border-indigo-500/50 bg-card
        shadow-xl shadow-indigo-500/10 min-h-\[160px\]
        flex items-center justify-center text-center
        transition-all duration-300
        ${greenHovered ? 'border-emerald-400 shadow-emerald-500/20' : ''}
        ${redHovered ? 'border-rose-400 shadow-rose-500/20' : ''}
      `}>
        <p className="text-lg text-foreground leading-relaxed px-2">
          {'"'}{question.text}{'"'}
        </p>

        {/* Drag hint badge */}
        {!isDragging && (
          <motion.div 
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="px-3 py-1 rounded-full bg-indigo-500/80 text-xs text-indigo-100 flex items-center gap-1.5 shadow-lg border border-indigo-400/30">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>Grab and drag to classify</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export function LogicArena({ onComplete }: LogicArenaProps) {
  const [questions] = useState(() => getQuestions())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<{ questionId: number; correct: boolean }[]>([])
  const [showModal, setShowModal] = useState(false)
  const [lastResult, setLastResult] = useState<{ correct: boolean; nuance: string; meme?: string } | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [greenHovered, setGreenHovered] = useState(false)
  const [redHovered, setRedHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = (currentIndex / questions.length) * 100

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#6ee7b7']
    })
  }, [])

  const handleDrop = useCallback((zone: "green" | "red") => {
    const correct = currentQuestion.zone === zone
    
    setLastResult({ correct, nuance: currentQuestion.nuance, meme: currentQuestion.meme })
    setResults((prev) => [...prev, { questionId: currentQuestion.id, correct }])

    if (correct) {
      triggerConfetti()
    } else {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }

    setShowModal(true)
  }, [currentQuestion, triggerConfetti])

  const handleModalClose = useCallback(() => {
    setShowModal(false)
    setLastResult(null)

    if (currentIndex + 1 >= questions.length) {
      onComplete(results.concat({ questionId: currentQuestion.id, correct: lastResult?.correct ?? false }))
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, results, currentQuestion, lastResult, onComplete])

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-8 ${isShaking ? 'animate-shake' : ''}`}>
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-indigo-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden border border-border">
          <motion.div
            className="h-full bg-linear-to-r from-indigo-600 to-indigo-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          />
        </div>
      </motion.div>

      {/* Card Container */}
      <div className="min-h-\[200px\] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <DraggableCard
            key={currentQuestion.id}
            question={currentQuestion}
            onDragEnd={handleDrop}
            greenHovered={greenHovered}
            redHovered={redHovered}
            setGreenHovered={setGreenHovered}
            setRedHovered={setRedHovered}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        </AnimatePresence>

        {/* Drag Tooltip */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            >
              <div className="px-4 py-2 rounded-lg bg-indigo-600/90 border border-indigo-400/50 shadow-lg shadow-indigo-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    <span className="text-rose-300">Drag left for BURNOUT</span>
                  </span>
                  <span className="text-indigo-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-300">Drag right for SUSTAINABLE</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-muted-foreground"
      >
        Drag the card or click a zone to classify this remote habit
      </motion.p>

      {/* Drop Zones */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DropZone
          type="red"
          isHovered={redHovered}
          onDrop={() => handleDrop("red")}
          onHover={setRedHovered}
        />
        <DropZone
          type="green"
          isHovered={greenHovered}
          onDrop={() => handleDrop("green")}
          onHover={setGreenHovered}
        />
      </motion.div>

      {/* Results Trail */}
      <motion.div
        className="flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Array.from({ length: questions.length }).map((_, i) => {
          const result = results[i]
          return (
            <motion.div
              key={i}
              className={`
                w-8 h-8 rounded-md border flex items-center justify-center text-xs
                ${i === currentIndex 
                  ? 'border-indigo-500 bg-indigo-500/20 animate-pulse-border' 
                  : result 
                    ? result.correct 
                      ? 'border-emerald-500 bg-emerald-500/20' 
                      : 'border-rose-500 bg-rose-500/20'
                    : 'border-border bg-secondary/50'
                }
              `}
              initial={i === currentIndex ? { scale: 1.2 } : {}}
              animate={i === currentIndex ? { scale: 1 } : {}}
            >
              {result ? (
                result.correct ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <X className="w-4 h-4 text-rose-400" />
                )
              ) : (
                <span className="text-muted-foreground">{i + 1}</span>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Nuance Modal */}
      <NuanceModal
        isOpen={showModal}
        onClose={handleModalClose}
        correct={lastResult?.correct ?? false}
        nuance={lastResult?.nuance ?? ""}
        meme={lastResult?.meme}
        questionNumber={currentIndex + 1}
      />
    </div>
  )
}
