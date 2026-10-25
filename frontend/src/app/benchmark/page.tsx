"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { ShieldAlert, Award, FileText } from "lucide-react";

const benchmarkData = [
  { name: 'BLEU-4', AUROC: 0.65, Consistency: 0.52, Detection: 0.45 },
  { name: 'ROUGE-L', AUROC: 0.70, Consistency: 0.58, Detection: 0.50 },
  { name: 'BERTScore', AUROC: 0.78, Consistency: 0.65, Detection: 0.55 },
  { name: 'BioClinicalBERT', AUROC: 0.85, Consistency: 0.72, Detection: 0.75 },
  { name: 'NeuroVal-3D', AUROC: 0.99, Consistency: 0.95, Detection: 0.97 },
];

export default function BenchmarkPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <motion.div initial="initial" animate="animate" variants={fadeIn} className="max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">Benchmark Comparison</h1>
        <p className="text-muted-foreground">
          Evaluating NeuroVal-3D against standard natural language generation (NLG) metrics and domain-specific models for clinical hallucination detection and report validation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Bar Chart Section */}
        <motion.div initial="initial" animate="animate" variants={fadeIn} className="glass-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-bold mb-6 flex items-center"><Award className="w-5 h-5 mr-2 text-accent"/> Performance Metrics Comparison</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} 
                />
                <Legend />
                <Bar dataKey="AUROC" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Consistency" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Detection" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Detailed Analysis Section */}
        <div className="space-y-6">
          <motion.div initial="initial" animate="animate" variants={fadeIn} className="glass-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-2 flex items-center text-foreground"><ShieldAlert className="w-5 h-5 mr-2 text-warning"/> Why N-gram Metrics Fail</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Standard NLG metrics like BLEU and ROUGE evaluate surface-level lexical overlap but fail to capture clinical nuances. A single word change (e.g., "Left" to "Right" or "No" to "Marked") can entirely alter the clinical diagnosis while maintaining a high BLEU score.
            </p>
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
              <p className="text-xs text-danger font-medium">Example: High BLEU, Critical Error</p>
              <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                <div><span className="font-bold text-foreground/80 block">Ground Truth:</span> No mass effect or midline shift.</div>
                <div><span className="font-bold text-foreground/80 block">Generated:</span> Marked mass effect or midline shift.</div>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground uppercase">BLEU Score: 0.85 (High) — NeuroVal-3D: Flagged Critical (Negation Error)</p>
            </div>
          </motion.div>

          <motion.div initial="initial" animate="animate" variants={fadeIn} className="glass-card p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-2 flex items-center text-foreground"><FileText className="w-5 h-5 mr-2 text-success"/> The NeuroVal-3D Advantage</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              NeuroVal-3D leverages a multi-axis framework specifically trained on clinical data, anchoring evaluations to the underlying 3D MRI volume. This enables it to accurately detect structural, semantic, and modality-specific hallucinations that language-only models miss.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
