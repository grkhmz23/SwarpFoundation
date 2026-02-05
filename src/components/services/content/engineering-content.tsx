"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, User, Code2, Palette, Cpu, Database, Globe, Shield,
  ChevronRight, Plus, Minus, Calendar, Clock, CheckCircle2, Circle,
  Zap, Target, BarChart3, Layers, MessageSquare, Video, Mail,
  Star, Award, TrendingUp, Briefcase, GitBranch, FolderOpen,
  MoreHorizontal, X, Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  level: "junior" | "mid" | "senior" | "lead";
  availability: number;
  avatar: string;
  projects: number;
}

interface Project {
  id: string;
  name: string;
  client: string;
  team: string[];
  progress: number;
  status: "active" | "completed" | "planning";
  weeks: number;
}

// Team Pod Builder
function TeamBuilder() {
  const [team, setTeam] = useState<TeamMember[]>([
    { id: "1", name: "Alex Chen", role: "Tech Lead", skills: ["System Design", "Node.js", "AWS"], level: "lead", availability: 80, avatar: "AC", projects: 3 },
    { id: "2", name: "Sarah Miller", role: "Senior Frontend", skills: ["React", "TypeScript", "UI/UX"], level: "senior", availability: 100, avatar: "SM", projects: 2 },
    { id: "3", name: "James Wilson", role: "Backend Dev", skills: ["Python", "PostgreSQL", "Redis"], level: "mid", availability: 100, avatar: "JW", projects: 1 },
    { id: "4", name: "Emma Davis", role: "DevOps Engineer", skills: ["Kubernetes", "Terraform", "CI/CD"], level: "senior", availability: 60, avatar: "ED", projects: 4 },
  ]);

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    { type: "Frontend", icon: Code2, color: "blue", count: team.filter(t => t.role.includes("Frontend")).length },
    { type: "Backend", icon: Database, color: "emerald", count: team.filter(t => t.role.includes("Backend")).length },
    { type: "DevOps", icon: Cpu, color: "purple", count: team.filter(t => t.role.includes("DevOps")).length },
    { type: "Design", icon: Palette, color: "pink", count: team.filter(t => t.role.includes("Design")).length },
    { type: "PM", icon: Briefcase, color: "orange", count: team.filter(t => t.role.includes("PM")).length },
  ];

  const addMember = (role: string) => {
    const newMember: TeamMember = {
      id: Math.random().toString(),
      name: `Engineer ${team.length + 1}`,
      role: role,
      skills: ["JavaScript", "React"],
      level: "mid",
      availability: 100,
      avatar: `E${team.length + 1}`,
      projects: 0,
    };
    setTeam([...team, newMember]);
    setSelectedRole(null);
  };

  const removeMember = (id: string) => {
    setTeam(team.filter(t => t.id !== id));
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case "lead": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "senior": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "mid": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-purple-500/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          <h4 className="text-sm font-bold text-white">Your Dedicated Team</h4>
        </div>
        <div className="text-xs text-gray-400">
          {team.length} members
        </div>
      </div>

      {/* Role Quick Add */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
        {roles.map((role) => (
          <button
            key={role.type}
            onClick={() => addMember(role.type)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-medium whitespace-nowrap transition-all hover:scale-105",
              `bg-${role.color}-500/10 border-${role.color}-500/30 text-${role.color}-400 hover:bg-${role.color}-500/20`
            )}
          >
            <Plus className="w-3 h-3" />
            {role.type}
            {role.count > 0 && <span className="ml-1 opacity-60">({role.count})</span>}
          </button>
        ))}
      </div>

      {/* Team Grid */}
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        <AnimatePresence>
          {team.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">{member.name}</div>
                    <div className="text-[10px] text-gray-400">{member.role}</div>
                    <div className="flex gap-1 mt-1">
                      {member.skills.slice(0, 2).map((skill, i) => (
                        <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[9px] px-2 py-0.5 rounded border", getLevelColor(member.level))}>
                    {member.level}
                  </span>
                  <button
                    onClick={() => removeMember(member.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Availability Bar */}
              <div className="mt-2 flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-500" />
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", member.availability > 80 ? "bg-emerald-500" : member.availability > 50 ? "bg-amber-500" : "bg-red-500")}
                    initial={{ width: 0 }}
                    animate={{ width: `${member.availability}%` }}
                  />
                </div>
                <span className="text-[9px] text-gray-400">{member.availability}%</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Team Stats */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">{team.length}</div>
          <div className="text-[9px] text-gray-500 uppercase">Engineers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-400">
            {Math.round(team.reduce((acc, t) => acc + t.availability, 0) / team.length)}%
          </div>
          <div className="text-[9px] text-gray-500 uppercase">Avg Availability</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">
            {team.filter(t => t.level === "senior" || t.level === "lead").length}
          </div>
          <div className="text-[9px] text-gray-500 uppercase">Senior+</div>
        </div>
      </div>
    </div>
  );
}

// Skill Matrix
function SkillMatrix() {
  const skills = [
    { name: "Frontend", level: 95, color: "blue" },
    { name: "Backend", level: 90, color: "emerald" },
    { name: "DevOps", level: 85, color: "purple" },
    { name: "Mobile", level: 80, color: "cyan" },
    { name: "AI/ML", level: 75, color: "amber" },
    { name: "Security", level: 88, color: "red" },
  ];

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-indigo-500/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">Team Expertise</h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <Star className="w-3 h-3" />
          <span>Top 5% Talent</span>
        </div>
      </div>

      <div className="space-y-3">
        {skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-gray-300">{skill.name}</span>
              <span className={cn(`text-${skill.color}-400`)}>{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={cn(`h-full bg-${skill.color}-500 rounded-full`)}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Certifications</div>
        <div className="flex flex-wrap gap-1.5">
          {["AWS Certified", "Kubernetes CKA", "Scrum Master", "Google Cloud", "Azure DevOps"].map((cert) => (
            <span key={cert} className="text-[9px] px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Project Timeline
function ProjectTimeline() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "FinTech Platform", client: "SwarpPay", team: ["Alex", "Sarah", "James"], progress: 75, status: "active", weeks: 12 },
    { id: "2", name: "AI Dashboard", client: "DataCorp", team: ["Emma", "Alex"], progress: 30, status: "active", weeks: 8 },
    { id: "3", name: "E-commerce API", client: "ShopMax", team: ["James", "Sarah"], progress: 100, status: "completed", weeks: 6 },
  ]);

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(),
      name: "New Project",
      client: "Client Name",
      team: ["TBD"],
      progress: 0,
      status: "planning",
      weeks: 4,
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white">Active Projects</h4>
        </div>
        <button
          onClick={addProject}
          className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-xs font-medium text-white group-hover:text-amber-400 transition-colors">
                  {project.name}
                </div>
                <div className="text-[10px] text-gray-500">{project.client}</div>
              </div>
              <span className={cn(
                "text-[9px] px-2 py-0.5 rounded border",
                project.status === "active" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                project.status === "completed" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                "bg-amber-500/10 border-amber-500/30 text-amber-400"
              )}>
                {project.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-2">
              <div className="flex justify-between text-[9px] text-gray-500 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    project.status === "completed" ? "bg-blue-500" : "bg-amber-500"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Team & Duration */}
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{project.team.length} people</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{project.weeks} weeks</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
        <div className="p-2 rounded-lg bg-black/40 text-center">
          <div className="text-lg font-bold text-white">{projects.filter(p => p.status === "active").length}</div>
          <div className="text-[9px] text-gray-500">Active</div>
        </div>
        <div className="p-2 rounded-lg bg-black/40 text-center">
          <div className="text-lg font-bold text-emerald-400">
            {projects.filter(p => p.status === "completed").length}
          </div>
          <div className="text-[9px] text-gray-500">Delivered</div>
        </div>
      </div>
    </div>
  );
}

// Communication Hub
function TeamComms() {
  const [messages, setMessages] = useState([
    { id: "1", user: "Alex", text: "Sprint planning starts in 10 mins", time: "2m ago", type: "meeting" },
    { id: "2", user: "Sarah", text: "Deployed the new auth system to staging", time: "15m ago", type: "update" },
    { id: "3", user: "System", text: "Daily standup reminder", time: "1h ago", type: "alert" },
  ]);

  return (
    <div className="bg-[#09090b] rounded-xl border border-white/10 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium text-gray-300">Team Channel</span>
        </div>
        <div className="flex gap-1.5">
          <Video className="w-3.5 h-3.5 text-gray-500 hover:text-white cursor-pointer" />
          <Mail className="w-3.5 h-3.5 text-gray-500 hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[8px] font-bold text-white shrink-0">
              {msg.user.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-gray-300">{msg.user}</span>
                <span className="text-[8px] text-gray-600">{msg.time}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50"
          />
          <button className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
export function EngineeringContent() {
  const [activeTab, setActiveTab] = useState<"team" | "projects" | "skills">("team");

  const engagementModels = [
    { icon: Zap, title: "Staff Augmentation", desc: "Engineers join your team" },
    { icon: Layers, title: "Dedicated Pod", desc: "Autonomous squad delivery" },
    { icon: Target, title: "Project Based", desc: "Fixed scope & timeline" },
    { icon: TrendingUp, title: "Advisory", desc: "CTO-as-a-service" },
  ];

  return (
    <div className="h-full bg-[#0a0f1a] text-gray-200 overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Engineering Teams</h3>
              <p className="text-[10px] text-purple-400">Dedicated Pods & Staff Augmentation</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: "team", label: "Team Builder", icon: Users },
              { id: "projects", label: "Projects", icon: FolderOpen },
              { id: "skills", label: "Skills", icon: Target },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "text-gray-500 hover:text-white"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Column */}
            <div className="h-full">
              {activeTab === "team" && <TeamBuilder />}
              {activeTab === "projects" && <ProjectTimeline />}
              {activeTab === "skills" && (
                <div className="space-y-4 h-full overflow-y-auto custom-scrollbar">
                  <SkillMatrix />
                  <TeamComms />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4 flex flex-col h-full">
              {activeTab !== "skills" && <TeamComms />}
              {activeTab === "skills" && <ProjectTimeline />}

              {/* Engagement Models */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-4 flex-1">
                <h4 className="text-sm font-bold text-white mb-3">Engagement Models</h4>
                <div className="grid grid-cols-2 gap-2">
                  {engagementModels.map((model, i) => (
                    <motion.div
                      key={model.title}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-purple-500/30 transition-colors cursor-pointer group"
                    >
                      <model.icon className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-medium text-white">{model.title}</div>
                      <div className="text-[9px] text-gray-500">{model.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Avg Tenure", value: "18mo", color: "purple" },
                    { label: "Satisfaction", value: "98%", color: "emerald" },
                    { label: "Time Zone", value: "Global", color: "blue" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-black/40">
                      <div className={cn("text-sm font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
                      <div className="text-[8px] text-gray-500 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl border border-purple-500/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Start Building Your Team</h4>
                    <p className="text-[10px] text-gray-400">48h to first engineer onboarded</p>
                  </div>
                  <button className="p-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngineeringContent;