"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Trophy, TrendingUp, AlertTriangle, Rocket } from "lucide-react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { getRank, generateSlackMessage } from "@/lib/game-data"

interface ResultsScreenProps {
  name: string
  score: number
  onContinue: () => void
}

export function ResultsScreen({ name, score, onContinue }: ResultsScreenProps) {
  const [copied, setCopied] = useState(false)
  const rank = getRank(score)
  const slackMessage = generateSlackMessage(name, score)

  useEffect(() => {
    // Celebrate high scores
    if (score >= 70) {
      const duration = score >= 90 ? 3000 : 1500
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: score >= 90 ? 7 : 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: score >= 90 
            ? ['#10b981', '#34d399', '#6366f1'] 
            : ['#6366f1', '#818cf8']
        })
        confetti({
          particleCount: score >= 90 ? 7 : 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: score >= 90 
            ? ['#10b981', '#34d399', '#6366f1'] 
            : ['#6366f1', '#818cf8']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }
  }, [score])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(slackMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const getScoreIcon = () => {
    if (score >= 90) return <Trophy className="w-8 h-8 text-emerald-400" />
    if (score >= 70) return <TrendingUp className="w-8 h-8 text-indigo-400" />
    return <AlertTriangle className="w-8 h-8 text-rose-400" />
  }

  const getScoreColor = () => {
    if (score >= 90) return "from-emerald-500 to-emerald-400"
    if (score >= 70) return "from-indigo-500 to-indigo-400"
    return "from-rose-500 to-rose-400"
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-secondary/50 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Rocket className="w-4 h-4 text-indigo-400" />
            <span>Challenge Complete</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Score Display */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex justify-center">
              <motion.div
                className={`
                  w-32 h-32 rounded-full border-4 flex items-center justify-center
                  bg-linear-to-br ${getScoreColor()} bg-opacity-20
                  ${score >= 90 ? 'border-emerald-400 animate-glow' : score >= 70 ? 'border-indigo-400' : 'border-rose-400'}
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.3 }}
              >
                <div className="text-center">
                  <motion.span
                    className="text-4xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {score}%
                  </motion.span>
                </div>
              </motion.div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Remote Optimization Score</p>
              <div className="flex items-center justify-center gap-2">
                {getScoreIcon()}
                <h2 className={`text-2xl font-bold ${rank.color}`}>
                  {rank.title}
                </h2>
              </div>
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div
            variants={itemVariants}
            className="text-sm"
          >
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Name</p>
              <p className="font-bold text-foreground">{name}</p>
            </div>
          </motion.div>

          {/* Score Breakdown Visual */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-xs text-muted-foreground font-medium">Score Breakdown</p>
            <div className="h-4 bg-secondary rounded-full overflow-hidden border border-border">
              <motion.div
                className={`h-full bg-linear-to-r ${getScoreColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0% - Needs Coffee</span>
              <span>100% - Zen Master</span>
            </div>
          </motion.div>

          {/* Slack Message */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-xs text-muted-foreground font-medium">Share on Slack</p>
            <div className="relative p-4 rounded-lg bg-input border border-border">
              <pre className="text-sm text-foreground whitespace-pre-wrap wrap-break-words pr-8">
                {slackMessage}
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={onContinue}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Continue to Retro
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
