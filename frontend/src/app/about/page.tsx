"use client";

import { motion } from "framer-motion";
import { Info, Mail, Code, GitBranch, Database, BookOpen, ExternalLink } from "lucide-react";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <motion.div initial="initial" animate="animate" variants={fadeIn} className="max-w-2xl w-full">
        
        <div className="glass-card p-8 rounded-xl border border-border space-y-6">
          <div className="flex items-center space-x-4 mb-6 border-b border-border pb-6">
            <div className="p-3 bg-accent rounded-full text-background">
              <Info className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">About NeuroVal-3D</h1>
              <p className="text-accent mt-1">Research & Development Project</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong>NeuroVal-3D</strong> is an advanced research prototype designed to explore the intersection of 3D medical imaging and large language models. The primary goal is to generate accurate, clinically consistent radiology reports from 3D brain MRI volumes (T1, T1CE, T2, FLAIR).
            </p>
            <p>
              A major challenge in applying generative AI to healthcare is the phenomenon of <strong>"hallucinations"</strong>—where models generate plausible but clinically incorrect statements. NeuroVal-3D addresses this by introducing a specialized 7-axis validation framework to detect semantic, lexical, structural, numeric, modality, negation, and lesion-type errors.
            </p>
            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg text-warning text-sm">
              <span className="font-bold">Disclaimer:</span> This application is a research demonstration and is not intended for clinical diagnosis, patient care, or commercial medical use. The models and outputs provided are simulated representations of the underlying research architecture.
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-border space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Resources & References</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href="https://github.com/vikneshwaran16032005-alt/claude-skills" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium p-3 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg border border-border hover:border-accent">
                <GitBranch className="w-4 h-4" />
                GitHub Repository
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a href="https://www.kaggle.com/datasets/awsaf49/brats20-dataset-training-validation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium p-3 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg border border-border hover:border-accent">
                <Database className="w-4 h-4" />
                BRATS 2020 Dataset
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a href="https://huggingface.co/datasets/Jupitern52/TextBraTS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium p-3 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg border border-border hover:border-accent">
                <BookOpen className="w-4 h-4" />
                TextBraTS Dataset
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a href="https://huggingface.co/datasets/JiayuLei/RadGenome-Brain_MRI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium p-3 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg border border-border hover:border-accent">
                <Database className="w-4 h-4" />
                RadGenome Dataset
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a href="https://www.kaggle.com/code/vikneshwaran16032005/minor-project1/notebook" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium p-3 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg border border-border hover:border-accent">
                <Code className="w-4 h-4" />
                Source Code (Part 1)
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a href="https://www.kaggle.com/code/vikneshwaran16032005/minor-project2/notebook" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium p-3 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg border border-border hover:border-accent">
                <Code className="w-4 h-4" />
                Source Code (Part 2)
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </div>
            <div className="flex items-center justify-center pt-4 border-t border-border">
              <a href="mailto:research@example.com" className="flex items-center text-sm font-medium hover:text-accent transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Contact Team
              </a>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
