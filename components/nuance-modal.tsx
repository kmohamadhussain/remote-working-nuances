"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Terminal, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NuanceModalProps {
  isOpen: boolean
  onClose: () => void
  correct: boolean
  nuance: string
  meme?: string
  questionNumber: number
}

export function NuanceModal({ isOpen, onClose, correct, nuance, meme, questionNumber }: NuanceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-lg"
          >
            <div className={`
              rounded-lg border-2 bg-card overflow-hidden shadow-2xl
              ${correct 
                ? 'border-emerald-500/50 shadow-emerald-500/20' 
                : 'border-rose-500/50 shadow-rose-500/20'
              }
            `}>
              {/* Header */}
              <div className={`
                px-4 py-3 border-b flex items-center gap-3
                ${correct 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-rose-500/10 border-rose-500/30'
                }
              `}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${correct ? 'bg-emerald-500' : 'bg-rose-500'}
                `}>
                  {correct ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <X className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-bold ${correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {correct ? 'Great choice!' : 'Oops, not quite!'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Question {questionNumber}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Terminal className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">
                      Why this matters:
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {nuance}
                    </p>
                  </div>
                </div>

                {/* Meme Section */}
                {meme && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -top-2 left-3 px-2 py-0.5 bg-indigo-600 text-xs text-indigo-100 rounded-full font-medium">
                      Meanwhile...
                    </div>
                    <div className="mt-2 p-4 rounded-lg bg-slate-900/80 border border-indigo-500/30 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-indigo-200/90 leading-relaxed">
                        {meme}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {/* Status indicator */}
                <div className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm
                  ${correct 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'bg-rose-500/10 text-rose-400'
                  }
                `}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  {correct 
                    ? 'Remote optimization pattern recognized' 
                    : 'Anti-pattern flagged for review'
                  }
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-secondary/30">
                <Button
                  onClick={onClose}
                  className={`
                    w-full group
                    ${correct 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }
                  `}
                >
                  <span>Continue Assessment</span>
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
