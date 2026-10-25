"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Database, Cpu, BrainCircuit, Activity, Focus, Search, Share2, ChevronDown, ChevronRight } from "lucide-react";

const pipelineStages = [
  { id: 1, title: "Stage 1: Preprocessing", icon: <Database />, desc: "Registration, skull stripping, and normalization of 3D MRI volumes (T1, T1CE, T2, FLAIR)." },
  { id: 2, title: "Stage 2: 3D Encoder", icon: <Layers />, desc: "Extracting volumetric spatial features using a specialized 3D Convolutional Neural Network." },
  { id: 3, title: "Stage 3: Multimodal Projector", icon: <Share2 />, desc: "Bridging the visual feature space to the language model embedding space." },
  { id: 4, title: "Stage 4: BART Decoder", icon: <BrainCircuit />, desc: "Auto-regressive generation of the radiology report text." },
  { id: 5, title: "Stage 5: NeuroVal-3D Validator", icon: <Activity />, desc: "Multi-axis hallucination detection checking Semantic, Lexical, Structural, Numeric, Modality, Negation, and Lesion-Type consistencies." },
  { id: 6, title: "Stage 6: Anatomical Anchor", icon: <Focus />, desc: "Grounding generated text entities to specific 3D spatial regions." },
  { id: 7, title: "Stage 7: Grad-CAM Explainability", icon: <Search />, desc: "Visualizing network attention and highlighting model focus regions on the original MRI." },
  { id: 8, title: "Stage 8: Perturbation Benchmark", icon: <Layers />, desc: "Stress-testing the model with synthetic clinical errors to measure detection sensitivity." },
];

export default function ArchitecturePage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">System Architecture</h1>
          <p className="text-muted-foreground">
            Interactive visualization of the end-to-end pipeline, from 3D MRI input to validated radiology report.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[27px] top-[40px] bottom-[40px] w-0.5 bg-border -z-10 hidden md:block"></div>

          <div className="space-y-4">
            {pipelineStages.map((stage, index) => {
              const isExpanded = expandedId === stage.id;
              
              return (
                <motion.div 
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-card rounded-xl border transition-all duration-300 ${
                    isExpanded ? 'border-accent shadow-lg shadow-accent/10' : 'border-border hover:border-accent/50'
                  }`}
                >
                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : stage.id)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${
                        isExpanded ? 'bg-accent text-background' : 'bg-card border border-border text-muted-foreground'
                      }`}>
                        {stage.icon}
                      </div>
                      <h2 className={`font-bold text-lg ${isExpanded ? 'text-accent' : 'text-foreground'}`}>
                        {stage.title}
                      </h2>
                    </div>
                    <div>
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-accent" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 pl-[88px]">
                          <p className="text-muted-foreground leading-relaxed">
                            {stage.desc}
                          </p>
                          
                          {/* Simulated diagram placeholder for specific stages */}
                          {stage.id === 5 && (
                            <div className="mt-4 p-4 bg-background/50 border border-border rounded-lg text-sm text-center font-mono text-muted-foreground">
                              [ Validator Logic: Logistic Fusion(Axis_1 ... Axis_7) {'->'} Final Score ]
                            </div>
                          )}
                          {stage.id === 7 && (
                            <div className="mt-4 p-4 bg-background/50 border border-border rounded-lg flex justify-center space-x-4">
                              <div className="w-16 h-16 bg-gradient-to-tr from-accent/20 to-danger/40 rounded border border-border flex items-center justify-center text-[10px] text-foreground/50">Heatmap 1</div>
                              <div className="w-16 h-16 bg-gradient-to-tr from-secondary/20 to-warning/40 rounded border border-border flex items-center justify-center text-[10px] text-foreground/50">Heatmap 2</div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
