"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Activity, LineChart, Cpu, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <Brain className="w-4 h-4 mr-2" /> },
    { name: "Live Demo", href: "/demo", icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: "Architecture", href: "/architecture", icon: <Cpu className="w-4 h-4 mr-2" /> },
    { name: "Results", href: "/results", icon: <LineChart className="w-4 h-4 mr-2" /> },
    { name: "Benchmark", href: "/benchmark", icon: <LineChart className="w-4 h-4 mr-2" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
            className="bg-primary p-2 rounded-lg"
          >
            <Brain className="w-6 h-6 text-accent" />
          </motion.div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            NeuroVal<span className="text-accent">-3D</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-foreground/80"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
