"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShoppingCart,
  User,
  Bell,
  CheckCircle2,
  Zap,
  Database,
  Code2,
  Send,
  Trash2,
  Edit,
  Plus,
  Activity,
  TrendingUp,
} from "lucide-react";

/**
 * Interactive Preview Components
 * These create REAL working demos that users can interact with
 */

// ============================================
// WEBSITE MODE PREVIEWS
// ============================================

export function LiveWebsitePreview({ enabled }: { enabled: Set<string> }) {
  const [currentView, setCurrentView] = useState<"hero" | "auth" | "checkout" | "dashboard">("hero");
  
  return (
    <div className="space-y-4">
      {/* Browser Chrome */}
      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/90 overflow-hidden">
        <div className="bg-swarp-dark/80 px-4 py-2 flex items-center gap-2 border-b border-swarp-blue/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-swarp-accent/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-swarp-neon-green/60" />
          </div>
          <div className="flex-1 bg-swarp-darker/60 rounded-lg px-3 py-1 text-xs text-gray-500 font-mono">
            https://yoursite.com/{currentView}
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="bg-gradient-to-b from-swarp-dark/50 to-swarp-darker/80 p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentView === "hero" && <HeroSection key="hero" />}
            {currentView === "auth" && enabled.has("auth") && <AuthSection key="auth" />}
            {currentView === "checkout" && enabled.has("payments") && <CheckoutSection key="checkout" />}
            {currentView === "dashboard" && enabled.has("analytics") && <AnalyticsSection key="dashboard" />}
          </AnimatePresence>
        </div>

        {/* Navigation Pills */}
        <div className="bg-swarp-dark/60 px-4 py-3 border-t border-swarp-blue/20 flex gap-2">
          <NavPill active={currentView === "hero"} onClick={() => setCurrentView("hero")}>
            Home
          </NavPill>
          {enabled.has("auth") && (
            <NavPill active={currentView === "auth"} onClick={() => setCurrentView("auth")}>
              Login
            </NavPill>
          )}
          {enabled.has("payments") && (
            <NavPill active={currentView === "checkout"} onClick={() => setCurrentView("checkout")}>
              Checkout
            </NavPill>
          )}
          {enabled.has("analytics") && (
            <NavPill active={currentView === "dashboard"} onClick={() => setCurrentView("dashboard")}>
              Dashboard
            </NavPill>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        ✨ Interactive demo • Click tabs to switch views • {enabled.size} modules active
      </div>
    </div>
  );
}

function NavPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
        active
          ? "bg-swarp-blue/30 text-swarp-cyan border border-swarp-cyan/40"
          : "bg-swarp-darker/60 text-gray-500 hover:text-swarp-cyan border border-swarp-blue/20"
      }`}
    >
      {children}
    </button>
  );
}

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center space-y-6"
    >
      <motion.h1
        className="text-4xl font-bold text-gradient"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        Your Product Name
      </motion.h1>
      <p className="text-gray-400 max-w-md mx-auto">
        The ultimate solution for modern teams. Built with cutting-edge tech, designed for performance.
      </p>
      <div className="flex gap-3 justify-center">
        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-swarp-blue to-swarp-cyan text-white font-medium hover:scale-105 transition">
          Get Started
        </button>
        <button className="px-6 py-2 rounded-xl border border-swarp-blue/30 text-swarp-cyan hover:bg-swarp-blue/10 transition">
          Learn More
        </button>
      </div>

      <motion.div
        className="mt-8 grid grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { icon: Zap, label: "Fast", value: "2x" },
          { icon: Lock, label: "Secure", value: "256-bit" },
          { icon: Activity, label: "Reliable", value: "99.9%" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-swarp-blue/30 bg-swarp-dark/50 p-4">
            <stat.icon className="h-6 w-6 text-swarp-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-swarp-cyan">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function AuthSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✅ Demo: Login successful!");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-dark/80 p-6 space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-swarp-cyan">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-swarp-darker/80 border border-swarp-blue/30 text-gray-300 text-sm focus:border-swarp-cyan/50 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-swarp-darker/80 border border-swarp-blue/30 text-gray-300 text-sm focus:border-swarp-cyan/50 focus:outline-none transition"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-swarp-cyan"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-swarp-blue to-swarp-cyan text-white font-medium hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                        {loading ? "Signing in..." : "Sign In"}
                      </button>
                    </div>

                    <div className="text-center text-xs text-gray-500">
                      Don&apos;t have an account?{" "}
                      <button className="text-swarp-cyan hover:underline">Sign up</button>
                    </div>
                  </div>
                </motion.div>
              );
            }

function CheckoutSection() {
  const [cardNumber, setCardNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("✅ Demo: Payment processed successfully!");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-4">
        {/* Order Summary */}
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-dark/80 p-6">
          <h3 className="text-lg font-bold text-swarp-cyan mb-4 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Summary
          </h3>
          <div className="space-y-3">
            {[
              { name: "Pro Plan", price: "$49/mo" },
              { name: "Setup Fee", price: "$99" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.name}</span>
                <span className="text-swarp-cyan font-medium">{item.price}</span>
              </div>
            ))}
            <div className="border-t border-swarp-blue/20 pt-3 mt-3 flex justify-between font-bold">
              <span className="text-gray-300">Total</span>
              <span className="text-swarp-cyan text-lg">$148</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-dark/80 p-6">
          <h3 className="text-lg font-bold text-swarp-cyan mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 rounded-lg bg-swarp-darker/80 border border-swarp-blue/30 text-gray-300 text-sm focus:border-swarp-cyan/50 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 rounded-lg bg-swarp-darker/80 border border-swarp-blue/30 text-gray-300 text-sm focus:border-swarp-cyan/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-2 rounded-lg bg-swarp-darker/80 border border-swarp-blue/30 text-gray-300 text-sm focus:border-swarp-cyan/50 focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-swarp-blue to-swarp-cyan text-white font-medium hover:scale-105 transition disabled:opacity-50"
            >
              {processing ? "Processing..." : "Complete Payment"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AnalyticsSection() {
  const [metrics] = useState([
    { label: "Page Views", value: "24.5K", change: "+12%" },
    { label: "Conversions", value: "1,234", change: "+8%" },
    { label: "Revenue", value: "$12.3K", change: "+23%" },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-swarp-blue/30 bg-swarp-dark/80 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{metric.label}</span>
              <TrendingUp className="h-4 w-4 text-swarp-neon-green" />
            </div>
            <div className="text-2xl font-bold text-swarp-cyan">{metric.value}</div>
            <div className="text-xs text-swarp-neon-green mt-1">{metric.change} vs last week</div>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-dark/80 p-6">
        <h4 className="text-sm font-medium text-swarp-cyan mb-4">Traffic Overview</h4>
        <div className="h-48 rounded-lg bg-swarp-darker/60 border border-swarp-blue/20 flex items-end gap-2 p-4">
          {[45, 62, 38, 72, 55, 68, 80].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 bg-gradient-to-t from-swarp-blue to-swarp-cyan rounded-t"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// TOOLS MODE PREVIEWS
// ============================================

export function LiveToolsPreview({ enabled }: { enabled: Set<string> }) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { role: "bot", text: "👋 Hi! I'm your assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `I received: "${input}". This is a demo response!` },
      ]);
    }, 800);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Bot Chat Interface */}
      {enabled.has("bots") && (
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/90 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-swarp-neon-green animate-pulse" />
            <h4 className="text-sm font-medium text-swarp-cyan">AI Assistant</h4>
          </div>

          <div className="h-64 overflow-y-auto space-y-3 mb-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-swarp-blue/30 text-gray-300"
                      : "bg-swarp-dark/80 border border-swarp-blue/30 text-gray-400"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg bg-swarp-dark/80 border border-swarp-blue/30 text-gray-300 text-sm focus:border-swarp-cyan/50 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-swarp-blue to-swarp-cyan text-white hover:scale-105 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Alert Panel */}
      {enabled.has("alerts") && (
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/90 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-swarp-cyan flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </h4>
            <span className="text-xs text-gray-500">Live</span>
          </div>

          <div className="space-y-2">
            {[
              { type: "success", text: "Deployment completed", time: "2m ago" },
              { type: "warning", text: "High CPU usage detected", time: "5m ago" },
              { type: "info", text: "New user signed up", time: "8m ago" },
            ].map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="rounded-xl border border-swarp-blue/30 bg-swarp-dark/50 p-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-2 w-2 rounded-full mt-1 ${
                      alert.type === "success"
                        ? "bg-swarp-neon-green"
                        : alert.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-swarp-cyan"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-sm text-gray-300">{alert.text}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{alert.time}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {enabled.has("admin") && (
        <div className="md:col-span-2 rounded-2xl border border-swarp-blue/30 bg-swarp-darker/90 p-4">
          <h4 className="text-sm font-medium text-swarp-cyan mb-4 flex items-center gap-2">
            <User className="h-4 w-4" />
            User Management
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-swarp-blue/20">
                  <th className="text-left py-2 text-gray-500 font-medium">Name</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Role</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Alice Johnson", role: "Admin", status: "Active" },
                  { name: "Bob Smith", role: "Editor", status: "Active" },
                  { name: "Carol White", role: "Viewer", status: "Inactive" },
                ].map((user, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-swarp-blue/10"
                  >
                    <td className="py-3 text-gray-300">{user.name}</td>
                    <td className="py-3 text-gray-400">{user.role}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          user.status === "Active"
                            ? "bg-swarp-neon-green/20 text-swarp-neon-green"
                            : "bg-gray-700/30 text-gray-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-swarp-cyan hover:text-swarp-blue text-xs">
                        <Edit className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// SOFTWARE MODE PREVIEWS
// ============================================

export function LiveSoftwarePreview({ enabled }: { enabled: Set<string> }) {
  const [activeTab, setActiveTab] = useState<"code" | "api" | "db">("code");
  const [apiLogs, setApiLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setApiLogs((prev) => [
        ...prev.slice(-4),
        `[${new Date().toLocaleTimeString()}] ${
          ["GET /users 200", "POST /orders 201", "GET /metrics 200", "PUT /settings 200"][
            Math.floor(Math.random() * 4)
          ]
        }`,
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2">
        {enabled.has("api") && (
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "code"
                ? "bg-swarp-blue/30 text-swarp-cyan"
                : "bg-swarp-darker/60 text-gray-500 hover:text-swarp-cyan"
            }`}
          >
            Code Editor
          </button>
        )}
        {enabled.has("api") && (
          <button
            onClick={() => setActiveTab("api")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "api"
                ? "bg-swarp-blue/30 text-swarp-cyan"
                : "bg-swarp-darker/60 text-gray-500 hover:text-swarp-cyan"
            }`}
          >
            API Logs
          </button>
        )}
        {enabled.has("db") && (
          <button
            onClick={() => setActiveTab("db")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "db"
                ? "bg-swarp-blue/30 text-swarp-cyan"
                : "bg-swarp-darker/60 text-gray-500 hover:text-swarp-cyan"
            }`}
          >
            Database
          </button>
        )}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === "code" && (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/95 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-mono">src/main.rs</span>
              <Code2 className="h-4 w-4 text-swarp-cyan" />
            </div>
            <pre className="text-xs font-mono text-gray-400 overflow-x-auto">
              <code>{enabled.has("solana") ? SOLANA_CODE : TYPESCRIPT_CODE}</code>
            </pre>
          </motion.div>
        )}

        {activeTab === "api" && (
          <motion.div
            key="api"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/95 p-4"
          >
            <h4 className="text-xs text-gray-500 mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-swarp-cyan" />
              Live API Requests
            </h4>
            <div className="font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
              {apiLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-swarp-cyan"
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "db" && (
          <motion.div
            key="db"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/95 p-4"
          >
            <h4 className="text-xs text-gray-500 mb-3 flex items-center gap-2">
              <Database className="h-4 w-4 text-swarp-cyan" />
              Database Query
            </h4>
            <pre className="text-xs font-mono text-swarp-cyan">
{`SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE users.created_at > NOW() - INTERVAL '30 days'
GROUP BY users.id
ORDER BY order_count DESC
LIMIT 10;`}
            </pre>
            <div className="mt-4 text-xs text-gray-500">
              <CheckCircle2 className="h-3 w-3 inline text-swarp-neon-green" /> Query executed in 23ms
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Code snippets
const TYPESCRIPT_CODE = `// API Route Example
export async function POST(req: Request) {
  const body = await req.json();
  
  // Validate input
  const validated = schema.parse(body);
  
  // Process request
  const result = await db.insert(users).values({
    name: validated.name,
    email: validated.email,
  });
  
  return Response.json({ 
    success: true, 
    id: result.id 
  });
}`;

const SOLANA_CODE = `use anchor_lang::prelude::*;

#[program]
pub mod swarp_protocol {
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        escrow.authority = ctx.accounts.authority.key();
        escrow.bump = ctx.bumps.escrow;
        Ok(())
    }
    
    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        // Transfer tokens to escrow
        anchor_spl::token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.user_token.to_account_info(),
                    to: ctx.accounts.escrow_token.to_account_info(),
                    authority: ctx.accounts.user.to_account_info(),
                },
            ),
            amount,
        )?;
        Ok(())
    }
}`;
