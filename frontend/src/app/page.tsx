"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Activity, Database, CheckCircle, SearchCode } from "lucide-react";

export default function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-16 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl -z-10" />

      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
          AI-Powered Brain MRI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
            Report Generation & Validation
          </span>
        </motion.h1>

        <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Generate highly accurate radiology reports from 3D brain MRI scans and validate them using our specialized seven-axis clinical consistency framework.
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/demo"
            className="w-full sm:w-auto px-8 py-4 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-accent/25 hover:shadow-accent/40"
          >
            <span>Try Live Demo</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/architecture"
            className="w-full sm:w-auto px-8 py-4 bg-card border border-border text-foreground font-medium rounded-lg hover:bg-card/80 transition-all flex items-center justify-center space-x-2"
          >
            <SearchCode className="w-5 h-5 text-muted-foreground" />
            <span>View Architecture</span>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-16">
          <StatCard icon={<Database className="w-6 h-6 text-secondary" />} title="1,376" subtitle="MRI Reports Evaluated" />
          <StatCard icon={<Brain className="w-6 h-6 text-accent" />} title="369" subtitle="Brain MRI Volumes" />
          <StatCard icon={<CheckCircle className="w-6 h-6 text-success" />} title="0.9961" subtitle="AUROC on TextBraTS" />
          <StatCard icon={<Activity className="w-6 h-6 text-warning" />} title="0.9715" subtitle="AUROC on RadGenome" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center space-y-3 hover:-translate-y-1 transition-transform duration-300">
      <div className="p-3 bg-background rounded-full border border-border">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-foreground">{title}</h3>
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{subtitle}</p>
    </div>
  );
}
