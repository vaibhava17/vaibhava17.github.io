"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  User,
  Briefcase,
  Code,
  Settings,
  Bell,
  RotateCcw,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"

interface Command {
  command: string
  description: string
  action: () => void
}

interface Agent {
  id: string
  codename: string
  status: "active" | "offline" | "training"
  mission?: string
}

export default function TacticalCLIPortfolio() {
  const [currentView, setCurrentView] = useState("overview")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [uptime, setUptime] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cliOpen, setCLIOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [agents] = useState<Agent[]>([
    { id: "V-001A", codename: "VAIBHAV PRIME", status: "active", mission: "Full Stack Operations" },
    { id: "V-002R", codename: "REACT SPECIALIST", status: "active", mission: "Frontend Deployment" },
    { id: "V-003P", codename: "PYTHON OPERATIVE", status: "active", mission: "Backend Systems" },
    { id: "V-004N", codename: "NODE GUARDIAN", status: "training", mission: "API Development" },
    { id: "V-005D", codename: "DATABASE SENTINEL", status: "active", mission: "Data Operations" },
  ])

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
        setCLIOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const commands: Command[] = [
    { command: "help", description: "Show available commands", action: () => showHelp() },
    { command: "overview", description: "Show tactical overview", action: () => setCurrentView("overview") },
    { command: "profile", description: "Display agent profile", action: () => setCurrentView("profile") },
    { command: "missions", description: "List completed missions", action: () => setCurrentView("missions") },
    { command: "projects", description: "Show project codex", action: () => setCurrentView("projects") },
    { command: "skills", description: "Display tactical arsenal", action: () => setCurrentView("skills") },
    { command: "contact", description: "Open communication channels", action: () => setCurrentView("contact") },
    { command: "clear", description: "Clear terminal output", action: () => setCommandHistory([]) },
    { command: "status", description: "System status report", action: () => showStatus() },
    { command: "mobile", description: "Toggle mobile CLI", action: () => setCLIOpen(!cliOpen) },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const command = commands.find((c) => c.command === trimmedCmd)

    setCommandHistory((prev) => [...prev, `> ${cmd}`])

    if (command) {
      command.action()
      if (isMobile && trimmedCmd !== "clear" && trimmedCmd !== "status" && trimmedCmd !== "help") {
        setCLIOpen(false)
      }
    } else if (trimmedCmd) {
      setCommandHistory((prev) => [...prev, `Command not found: ${trimmedCmd}. Type 'help' for available commands.`])
    }

    setCurrentCommand("")
  }

  const showHelp = () => {
    const helpText = [
      "TACTICAL COMMAND SYSTEM - AVAILABLE OPERATIONS:",
      "",
      ...commands.map((cmd) => `  ${cmd.command.padEnd(12)} - ${cmd.description}`),
      "",
      "Use arrow keys for command history. Type command and press ENTER to execute.",
    ]
    setCommandHistory((prev) => [...prev, ...helpText])
  }

  const showStatus = () => {
    const statusText = [
      "SYSTEM STATUS REPORT:",
      `  Uptime: ${formatUptime(uptime)}`,
      `  Active Agents: ${agents.filter((a) => a.status === "active").length}`,
      `  Missions: 23 ONGOING`,
      `  System Health: OPTIMAL`,
      `  Security Level: MAXIMUM`,
    ]
    setCommandHistory((prev) => [...prev, ...statusText])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand)
    }
  }

  const navItems = [
    { id: "overview", label: "COMMAND CENTER", icon: Terminal, active: true },
    { id: "profile", label: "AGENT NETWORK", icon: User },
    { id: "missions", label: "OPERATIONS", icon: Briefcase },
    { id: "projects", label: "INTELLIGENCE", icon: Code },
    { id: "skills", label: "SYSTEMS", icon: Settings },
  ]

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono flex relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isMobile && !sidebarOpen ? "-100%" : "0%",
        }}
        className={`${
          isMobile ? "fixed left-0 top-0 h-full w-80 z-50" : "w-80"
        } bg-gray-800 border-r border-gray-700 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <div className="text-orange-500 font-bold text-lg mb-1">TACTICAL OPS</div>
            <div className="text-gray-400 text-sm">v2.1.7 CLASSIFIED</div>
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-700 rounded">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="p-4 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 p-3 mb-2 rounded transition-all touch-manipulation ${
                currentView === item.id
                  ? "bg-orange-500 text-black font-bold"
                  : "text-gray-400 hover:text-white hover:bg-gray-700 active:bg-gray-600"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm md:text-base">{item.label}</span>
            </button>
          ))}
        </div>

        {/* System Status */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-bold text-sm">SYSTEM ONLINE</span>
          </div>
          <div className="text-xs space-y-1">
            <div>UPTIME: {formatUptime(uptime)}</div>
            <div>AGENTS: {agents.filter((a) => a.status === "active").length} ACTIVE</div>
            <div>MISSIONS: 23 ONGOING</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 p-3 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-700 rounded mr-2 touch-manipulation"
              >
                <Menu size={20} />
              </button>
            )}
            <span className="text-gray-400 text-sm md:text-base">TACTICAL COMMAND /</span>
            <span className="text-orange-500 font-bold text-sm md:text-base">{currentView.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-gray-400 text-xs md:text-sm hidden sm:block">
              LAST UPDATE:{" "}
              {new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })}{" "}
              UTC
            </span>
            {isMobile && (
              <button onClick={() => setCLIOpen(true)} className="p-2 hover:bg-gray-700 rounded touch-manipulation">
                <Terminal size={20} className="text-orange-500" />
              </button>
            )}
            <Bell size={16} className="text-gray-400 hidden md:block" />
            <RotateCcw size={16} className="text-gray-400 hidden md:block" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Main View */}
          <div className="flex-1 p-3 md:p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentView === "overview" && <OverviewView agents={agents} />}
              {currentView === "profile" && <ProfileView />}
              {currentView === "missions" && <MissionsView />}
              {currentView === "projects" && <ProjectsView />}
              {currentView === "skills" && <SkillsView />}
              {currentView === "contact" && <ContactView />}
            </AnimatePresence>
          </div>

          {/* Desktop CLI Terminal */}
          {!isMobile && (
            <div className="w-96 bg-black border-l border-gray-700 flex flex-col">
              <div className="p-3 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-orange-500" />
                  <span className="text-orange-500 font-bold">TACTICAL CLI</span>
                </div>
              </div>

              <div
                ref={terminalRef}
                className="flex-1 p-3 overflow-y-auto text-sm"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                <div className="text-green-400 mb-2">
                  TACTICAL COMMAND SYSTEM v2.1.7
                  <br />
                  Type 'help' for available commands.
                </div>

                {commandHistory.map((line, index) => (
                  <div key={index} className={line.startsWith(">") ? "text-orange-500" : "text-gray-300"}>
                    {line}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-700 bg-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">tactical@ops:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-green-400 outline-none text-sm"
                    placeholder="Enter command..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile CLI Modal */}
      <AnimatePresence>
        {cliOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setCLIOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 z-50 max-h-[70vh] flex flex-col"
            >
              {/* CLI Header */}
              <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-orange-500" />
                  <span className="text-orange-500 font-bold">TACTICAL CLI</span>
                </div>
                <button onClick={() => setCLIOpen(false)} className="p-2 hover:bg-gray-700 rounded touch-manipulation">
                  <ChevronDown size={20} />
                </button>
              </div>

              {/* CLI Content */}
              <div className="flex-1 p-4 overflow-y-auto text-sm">
                <div className="text-green-400 mb-2">
                  TACTICAL COMMAND SYSTEM v2.1.7
                  <br />
                  Type 'help' for available commands.
                </div>

                {commandHistory.map((line, index) => (
                  <div key={index} className={line.startsWith(">") ? "text-orange-500" : "text-gray-300"}>
                    {line}
                  </div>
                ))}
              </div>

              {/* CLI Input */}
              <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 text-sm">tactical@ops:~$</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-green-400 outline-none text-sm"
                    placeholder="Enter command..."
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function OverviewView({ agents }: { agents: Agent[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 md:space-y-6"
    >
      {/* Agent Allocation */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">AGENT ALLOCATION</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
          <div className="text-center p-4 bg-gray-700 rounded">
            <div className="text-2xl md:text-4xl font-bold text-white mb-2">3</div>
            <div className="text-gray-400 text-sm md:text-base">Active Field</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded">
            <div className="text-2xl md:text-4xl font-bold text-white mb-2">15</div>
            <div className="text-gray-400 text-sm md:text-base">Projects</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded">
            <div className="text-2xl md:text-4xl font-bold text-white mb-2">5</div>
            <div className="text-gray-400 text-sm md:text-base">Technologies</div>
          </div>
        </div>

        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center gap-3 md:gap-4 p-3 bg-gray-700 rounded">
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  agent.status === "active"
                    ? "bg-green-400"
                    : agent.status === "training"
                      ? "bg-orange-500"
                      : "bg-red-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm md:text-base">{agent.id}</div>
                <div className="text-gray-400 text-xs md:text-sm truncate">{agent.codename}</div>
              </div>
              {agent.mission && <div className="text-xs md:text-sm text-gray-400 hidden sm:block">{agent.mission}</div>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProfileView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">AGENT PROFILE</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div>
            <h3 className="text-orange-500 font-bold mb-3 text-sm md:text-base">PERSONAL DATA</h3>
            <div className="space-y-2 text-xs md:text-sm">
              <div>
                <span className="text-gray-400">NAME:</span> VAIBHAV AGARWAL
              </div>
              <div>
                <span className="text-gray-400">DESIGNATION:</span> SOFTWARE ENGINEER
              </div>
              <div>
                <span className="text-gray-400">CONTACT:</span> +91 8279875697
              </div>
              <div className="break-all">
                <span className="text-gray-400">EMAIL:</span> iamvaibhav.agarwal@gmail.com
              </div>
              <div>
                <span className="text-gray-400">CLEARANCE:</span> FULL STACK
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-orange-500 font-bold mb-3 text-sm md:text-base">EDUCATION</h3>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <div className="font-bold">B. Tech. Computer Science</div>
                <div className="text-gray-400">Shri Siddhi Vinayak Group Of Institutions</div>
                <div className="text-gray-400">Graduated 2022</div>
              </div>
              <div>
                <div className="font-bold">Minor in CSE</div>
                <div className="text-gray-400">Indian Institute of Technology Mandi</div>
                <div className="text-gray-400">Sept 2024 - Present</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-orange-500 font-bold mb-3 text-sm md:text-base">CERTIFICATIONS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="bg-gray-700 p-3 rounded">
              <div className="font-bold">Project Engineer</div>
              <div className="text-gray-400">Wipro Ltd. (2022)</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="font-bold">Node.js Developer</div>
              <div className="text-gray-400">Udemy (2022)</div>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="font-bold">Django Python</div>
              <div className="text-gray-400">CETPA Infotech (2020)</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MissionsView() {
  const missions = [
    {
      company: "SOLFIN",
      role: "Software Development Engineer II",
      period: "Jan 2025 - Present",
      status: "ACTIVE",
      achievements: [
        "Developed scalable UI components in React",
        "Built and fine-tuned internal LLM wrapper",
        "Automated document processing (70% efficiency gain)",
        "Optimized LLM prompts and system integration",
      ],
    },
    {
      company: "TALENTXO",
      role: "Software Development Engineer I",
      period: "Sept 2023 - Dec 2024",
      status: "COMPLETED",
      achievements: [
        "30% improvement in application performance",
        "40% reduction in integration time",
        "99.9% uptime achievement",
        "95% reduction in post-deployment issues",
      ],
    },
    {
      company: "GUNI SMS",
      role: "Frontend Engineer",
      period: "Dec 2021 - Sept 2023",
      status: "COMPLETED",
      achievements: [
        "20% improvement in user engagement",
        "30% reduction in integration time",
        "Led team of 4 developers",
        "70% decrease in pre-release issues",
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">MISSION HISTORY</h2>

      {missions.map((mission, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
            <div className="flex-1">
              <h3 className="text-orange-500 font-bold text-base md:text-lg">{mission.company}</h3>
              <p className="text-gray-300 text-sm md:text-base">{mission.role}</p>
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <div
                className={`px-3 py-1 rounded text-xs font-bold w-fit ${
                  mission.status === "ACTIVE" ? "bg-green-500 text-black" : "bg-gray-600 text-white"
                }`}
              >
                {mission.status}
              </div>
              <div className="text-gray-400 text-xs md:text-sm">{mission.period}</div>
            </div>
          </div>

          <div className="space-y-2">
            {mission.achievements.map((achievement, i) => (
              <div key={i} className="flex items-start gap-2">
                <ChevronRight size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-xs md:text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function ProjectsView() {
  const projects = [
    {
      name: "Talent Partner Dashboard",
      url: "https://talentxo.com",
      status: "DEPLOYED",
      description: "Advanced recruitment management system",
    },
    {
      name: "Guni SMS Platform",
      url: "https://app.gunisms.com.au",
      status: "ACTIVE",
      description: "SMS management and analytics platform",
    },
    {
      name: "Magic Exports",
      url: "https://magicexports.in",
      status: "LIVE",
      description: "Export business management system",
    },
    {
      name: "Motoworld Website",
      url: "https://manaliladakhmotoworld.com/",
      status: "LIVE",
      description: "Tourism and motorcycle rental platform",
    },
    {
      name: "Club Events Handler",
      url: "https://intense-shelf-96174.herokuapp.com/",
      status: "ARCHIVED",
      description: "Event management system for clubs",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">PROJECT CODEX</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-orange-500 transition-colors touch-manipulation"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-orange-500 text-sm md:text-base flex-1 pr-2">{project.name}</h3>
              <div
                className={`px-2 py-1 rounded text-xs flex-shrink-0 ${
                  project.status === "ACTIVE"
                    ? "bg-green-500 text-black"
                    : project.status === "DEPLOYED" || project.status === "LIVE"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-600 text-white"
                }`}
              >
                {project.status}
              </div>
            </div>
            <p className="text-gray-400 text-xs md:text-sm mb-3">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors break-all"
            >
              {project.url}
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SkillsView() {
  const skillCategories = [
    {
      name: "FRONTEND",
      skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
    },
    {
      name: "BACKEND",
      skills: ["Python", "Node.js", "FastAPI", "Flask", "Express.js", "MongoDB", "MySQL", "JWT"],
    },
    {
      name: "TOOLS",
      skills: ["Git", "AWS", "Google Cloud", "Docker", "JIRA", "Postman", "VSCode", "Linux"],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 md:space-y-6"
    >
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">TACTICAL ARSENAL</h2>

      {skillCategories.map((category, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
          <h3 className="text-orange-500 font-bold mb-4 text-sm md:text-base">{category.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {category.skills.map((skill, i) => (
              <div key={i} className="bg-gray-700 px-2 md:px-3 py-2 rounded text-center text-xs md:text-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function ContactView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">COMMUNICATION CHANNELS</h2>

        <div className="space-y-4">
          <a
            href="mailto:iamvaibhav.agarwal@gmail.com"
            className="flex items-center gap-4 p-4 bg-gray-700 rounded hover:bg-gray-600 transition-colors touch-manipulation"
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm md:text-base">EMAIL PROTOCOL</div>
              <div className="text-gray-400 text-xs md:text-sm break-all">iamvaibhav.agarwal@gmail.com</div>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/vaibhava17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-700 rounded hover:bg-gray-600 transition-colors touch-manipulation"
          >
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm md:text-base">LINKEDIN NETWORK</div>
              <div className="text-gray-400 text-xs md:text-sm break-all">linkedin.com/in/vaibhava17</div>
            </div>
          </a>

          <a
            href="https://github.com/vaibhava17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-700 rounded hover:bg-gray-600 transition-colors touch-manipulation"
          >
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm md:text-base">CODE REPOSITORY</div>
              <div className="text-gray-400 text-xs md:text-sm break-all">github.com/vaibhava17</div>
            </div>
          </a>

          <a
            href="tel:+918279875697"
            className="flex items-center gap-4 p-4 bg-gray-700 rounded hover:bg-gray-600 transition-colors touch-manipulation"
          >
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm md:text-base">DIRECT COMM</div>
              <div className="text-gray-400 text-xs md:text-sm">+91 8279875697</div>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
