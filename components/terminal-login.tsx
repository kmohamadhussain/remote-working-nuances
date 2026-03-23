"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, ChevronRight, User, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { personas, type Persona } from "@/lib/game-data"

interface TerminalLoginProps {
  onStart: (name: string, persona: Persona) => void
}

export function TerminalLogin({ onStart }: TerminalLoginProps) {
  const [name, setName] = useState("")
  const [persona, setPersona] = useState<Persona | "">("")
  const [isInitializing, setIsInitializing] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim() || !persona) return
    setIsInitializing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onStart(name.trim(), persona as Persona)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Terminal Window */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <div className="flex-1 text-center text-sm text-muted-foreground">
            remote-nuance-challenge@2026:~
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-6">
          {/* ASCII Art Header */}
          <motion.pre
            variants={itemVariants}
            className="text-xs sm:text-sm text-indigo-400 overflow-x-auto"
          >
{`
 ██████╗ ███████╗███╗   ███╗ ██████╗ ████████╗███████╗
 ██╔══██╗██╔════╝████╗ ████║██╔═══██╗╚══██╔══╝██╔════╝
 ██████╔╝█████╗  ██╔████╔██║██║   ██║   ██║   █████╗  
 ██╔══██╗██╔══╝  ██║╚██╔╝██║██║   ██║   ██║   ██╔══╝  
 ██║  ██║███████╗██║ ╚═╝ ██║╚██████╔╝   ██║   ███████╗
 ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚══════╝
    ███╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗ ██████╗███████╗
    ████╗  ██║██║   ██║██╔══██╗████╗  ██║██╔════╝██╔════╝
    ██╔██╗ ██║██║   ██║███████║██╔██╗ ██║██║     █████╗  
    ██║╚██╗██║██║   ██║██╔══██║██║╚██╗██║██║     ██╔══╝  
    ██║ ╚████║╚██████╔╝██║  ██║██║ ╚████║╚██████╗███████╗
    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
`}
          </motion.pre>

          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-emerald-400">
              <span className="text-muted-foreground">{'>'}</span> System initialized...
            </p>
            <p className="text-emerald-400">
              <span className="text-muted-foreground">{'>'}</span> Loading remote work assessment module...
            </p>
            <p className="text-amber-400 terminal-cursor">
              <span className="text-muted-foreground">{'>'}</span> Awaiting developer credentials
            </p>
          </motion.div>

          {/* Input Fields */}
          <motion.div variants={itemVariants} className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-indigo-400 shrink-0" />
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  Your Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your handle..."
                  className="bg-input border-border focus:border-indigo-500 focus:ring-indigo-500/20"
                  disabled={isInitializing}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Code className="h-5 w-5 text-indigo-400 shrink-0" />
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  Your Role
                </label>
                <Select
                  value={persona}
                  onValueChange={(value) => setPersona(value as Persona)}
                  disabled={isInitializing}
                >
                  <SelectTrigger className="bg-input border-border focus:border-indigo-500 focus:ring-indigo-500/20">
                    <SelectValue placeholder="Select your dev persona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {personas.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <span className="flex items-center gap-2">
                          <span>{p.icon}</span>
                          <span>{p.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!name.trim() || !persona || isInitializing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 group"
            >
              {isInitializing ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Initializing system...</span>
                </motion.div>
              ) : (
                <>
                  <Terminal className="mr-2 h-4 w-4" />
                  <span>Initialize System</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-muted-foreground text-center pt-2"
          >
            v2026.03.22 | Developer Edition | 10 assessment queries loaded
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
