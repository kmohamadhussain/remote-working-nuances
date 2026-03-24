export interface Question {
  id: number
  text: string
  zone: "green" | "red"
  nuance: string
  meme?: string
}

const questions: Question[] = [
  { 
    id: 1, 
    text: "Working from bed because 'it's just emails today'.", 
    zone: "red", 
    nuance: "Your brain needs physical cues to separate work and rest. Bed = sleep, desk = work.",
    meme: "8 AM: 'Just checking emails from bed'\n2 PM: *still in bed, laptop burning thighs*\n6 PM: 'Why am I so tired?'\nSpine: 'I will remember this.'"
  },
  { 
    id: 2, 
    text: "Taking a 20-minute walk after lunch before returning to work.", 
    zone: "green", 
    nuance: "Movement breaks boost afternoon productivity by 30%. Your future self thanks you.",
    meme: "Before walk: *staring at screen blankly*\nDuring walk: 'Wait... THAT'S the solution!'\nAfter walk: *fixes bug in 5 minutes*\nBrain: Told you I needed oxygen."
  },
  { 
    id: 3, 
    text: "Keeping Slack open on your phone during dinner 'just in case'.", 
    zone: "red", 
    nuance: "Constant availability isn't dedication, it's a recipe for burnout. Dinner is sacred.",
    meme: "Partner: 'How was your day?'\nMe: *eyes on phone* 'Mmhmm'\nSlack: 'Anyone know where the docs are?'\nMe: 'I MUST RESPOND'\nPartner: 😐"
  },
  { 
    id: 4, 
    text: "Setting up a dedicated workspace with proper lighting and ergonomic chair.", 
    zone: "green", 
    nuance: "Your environment shapes your output. A $300 chair beats $3000 in physio bills.",
    meme: "Month 1: 'I'll work from the couch, it's fine'\nMonth 6: *back pain, neck pain, wrist pain*\nMe: 'Maybe I should invest in a desk'\nBody: 'YA THINK?'"
  },
  { 
    id: 5, 
    text: "Attending video calls while doing laundry because you're 'multitasking'.", 
    zone: "red", 
    nuance: "Multitasking is a myth. You're just doing two things poorly.",
    meme: "Me: *nodding on camera while folding socks*\nManager: 'What do you think about that approach?'\nMe: '...'\nMe: 'Sorry, you cut out for a second'\nManager: No I didn't."
  },
  { 
    id: 6, 
    text: "Blocking your calendar for 'Focus Time' every morning.", 
    zone: "green", 
    nuance: "Proactive calendar blocking is self-defense. If you don't protect your time, no one will.",
    meme: "Calendar: [FOCUS TIME - DO NOT BOOK]\nRecruiter: 'I see you have an opening at 9 AM!'\nMe: *visible frustration*\nCalendar: I tried to warn them."
  },
  { 
    id: 7, 
    text: "Feeling guilty for taking a 15-minute coffee break.", 
    zone: "red", 
    nuance: "You're not a robot. Breaks increase creativity and reduce errors. Take the break.",
    meme: "Me: *stands up to get coffee*\nBrain: 'You should be working'\nMe: *sits back down*\nAlso Brain: 'I can't think anymore'\nMe: 'WHAT DO YOU WANT FROM ME'"
  },
  { 
    id: 8, 
    text: "Having a morning routine before opening your laptop.", 
    zone: "green", 
    nuance: "The commute is gone but the ritual shouldn't be. Morning routines set daily tone.",
    meme: "Old me: Wake up → laptop → work in pajamas\nNew me: Wake up → coffee → shower → dressed → THEN laptop\nProductivity: 📈\nMental health: 📈\nPajama usage: 📉"
  },
  {
    id: 9,
    text: "Joining the standup from your phone while making breakfast.",
    zone: "red",
    nuance: "Half-present is worse than absent. Either be there fully or send an async update.",
    meme: "Me: 'Yesterday I worked on—' *egg sizzling*\nTeam: 'Are you... cooking?'\nMe: 'No! That's uh... my mechanical keyboard'\nTeam: 'Your keyboard smells like bacon?'"
  },
  {
    id: 10,
    text: "Closing all browser tabs except the one you're working on during focus time.",
    zone: "green",
    nuance: "Tab hoarding is attention fragmentation. Clean tabs, clean mind.",
    meme: "Before: 47 tabs, 3 browsers, constant tab switching\nAfter: 1 tab, pure focus\nRAM: 'FINALLY I CAN BREATHE'\nProductivity: 'Wait, this is possible?'"
  },
  {
    id: 11,
    text: "Saying yes to 'just one more quick task' when you're already at capacity.",
    zone: "red",
    nuance: "Overcommitting helps no one. A clear 'no' is better than a burned-out 'yes'.",
    meme: "Manager: 'Can you also handle the API?'\nMe: 'Sure!'\nManager: 'And the mobile app?'\nMe: 'I guess...'\nMe internally: *everything is fine* 🔥🔥🔥"
  },
  {
    id: 12,
    text: "Time-blocking different types of work to reduce context switching.",
    zone: "green",
    nuance: "Your brain works better with batched contexts. Group similar tasks together.",
    meme: "Old way: Task A → Task B → Meeting → Task A → Task C → ???\nNew way: [Deep Work Block] [Break] [Meetings] [Admin]\nBrain: 'Finally, I can function'\nBugs: 📉 Quality: 📈"
  },
  {
    id: 13,
    text: "Working weekends to 'catch up' on the backlog you're behind on.",
    zone: "red",
    nuance: "Weekend work is borrowing from future productivity. The backlog will always exist.",
    meme: "Friday: 'I'll just work a bit this weekend'\nSaturday: *works 6 hours*\nSunday: *works 4 hours*\nMonday: *exhausted, makes more bugs*\nBacklog: *still infinite*"
  },
  {
    id: 14,
    text: "Writing detailed handoff notes before going on vacation.",
    zone: "green",
    nuance: "Good documentation is a gift to your teammates. They'll cover you better with context.",
    meme: "Bad handoff: 'Everything should be fine lol'\nGood handoff: 'Here's every possible fire and how to extinguish it'\nTeam receiving good handoff: 'This person can take longer vacations'"
  },
  {
    id: 15,
    text: "Responding to non-urgent questions at 10 PM.",
    zone: "red",
    nuance: "If it's not urgent, it can wait until tomorrow. Setting boundaries teaches others to respect them.",
    meme: "10 PM: 'Hey, quick question about that project'\nMe: *responds immediately*\n10:30 PM: 'One more thing...'\nMe: *keeps responding*\nTeam: 'Oh they're always available!'\nMe: 'I've made a mistake'"
  },
  {
    id: 16,
    text: "Scheduling meetings only twice a week instead of daily.",
    zone: "green",
    nuance: "Batching meetings preserves deep work time. Not everything needs a meeting.",
    meme: "Old way: 5 daily 15-min syncs = 1.25 hours of context switching\nNew way: 2 focused 30-min sessions\nRecovered: 3+ hours of actual work\nMe: Why didn't I do this sooner?"
  },
  {
    id: 17,
    text: "Checking work dashboards every 10 minutes during your day off.",
    zone: "red",
    nuance: "If it's your day off, trust your teammates. Constant checking isn't dedication, it's anxiety.",
    meme: "Brain: 'Just one peek at the dashboard'\nAlso brain: 'What if everything is on fire?'\nDashboard: *all green*\nMe: 'Better check again in 5 minutes'\nVacation: 'Am I a joke to you?'"
  },
  {
    id: 18,
    text: "Documenting your decisions so you're not the single point of failure.",
    zone: "green",
    nuance: "Write it down once, save 100 future conversations. Documentation is freedom.",
    meme: "Before docs: 'How does X work?' → Slack me\nAfter docs: 'How does X work?' → Check the wiki\nMy DMs: Finally peaceful\nVacation: Actually possible now"
  },
  {
    id: 19,
    text: "Having back-to-back meetings from 9 AM to 5 PM every day.",
    zone: "red",
    nuance: "If you have no time to think, you're not working, you're just attending.",
    meme: "Calendar: [Meeting][Meeting][Meeting][Meeting][Meeting]\nActual productive time: 0 hours\nTeam: 'We need direction'\nMe: 'I literally cannot think'\nCalendar: *laughs*"
  },
  {
    id: 20,
    text: "Taking Fridays as 'no meeting' days for deep work.",
    zone: "green",
    nuance: "You need space to think beyond the immediate. Block it or lose it.",
    meme: "With meeting Fridays: Reactive, stressed, behind\nWith no-meeting Fridays: 'Wait, I can actually THINK'\nProductivity: Through the roof\nWhy didn't I do this sooner?"
  },
]

export const allQuestions: Question[] = questions

export function getQuestions(): Question[] {
  return shuffleArray(questions).slice(0, 10)
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export interface GameResult {
  name: string
  score: number
  feedback: {
    rating: number
    tags: string[]
    comment: string
  }
  date: string
}

export const feedbackTags = [
  "So Relatable",
  "Great Memes",
  "Made Me Reflect",
  "Sharing This",
  "Need More",
  "Too Real",
] as const

export function getRank(score: number): { title: string; color: string } {
  if (score >= 90) {
    return { title: "Senior Zen Architect", color: "text-emerald-400" }
  } else if (score >= 70) {
    return { title: "Productive Mid-Level", color: "text-indigo-400" }
  } else {
    return { title: "Junior Burnout Candidate", color: "text-rose-400" }
  }
}

export function saveResult(result: GameResult): void {
  if (typeof window === "undefined") return
  const history = getHistory()
  history.push(result)
  localStorage.setItem("challenge_history", JSON.stringify(history))

  // Also persist to Supabase
  fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  }).catch((err) => console.error("Failed to save to Supabase:", err))
}

export function getHistory(): GameResult[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("challenge_history")
  return stored ? JSON.parse(stored) : []
}

export function generateSlackMessage(name: string, score: number): string {
  return `[SYSTEM LOG]: ${name} optimized their remote stack with a ${score}% efficiency rating. #remote-nuance-challenge`
}
