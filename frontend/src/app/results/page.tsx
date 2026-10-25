"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Database, Network, TrendingUp } from "lucide-react";

const datasetResults = [
  { metric: "AUROC", TextBraTS: 0.9961, RadGenome: 0.9715 },
  { metric: "AUPRC", TextBraTS: 0.9850, RadGenome: 0.9520 },
  { metric: "F1 Score", TextBraTS: 0.9620, RadGenome: 0.9310 },
  { metric: "Accuracy", TextBraTS: 0.9780, RadGenome: 0.9450 }
];

const crossTransferResults = [
  { direction: "TextBraTS → RadGenome", AUROC: 0.9358 },
  { direction: "RadGenome → TextBraTS", AUROC: 1.0000 }
];

export default function ResultsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <motion.div initial="initial" animate="animate" variants={fadeIn} className="max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">Experimental Results</h1>
        <p className="text-muted-foreground">
          Comprehensive performance evaluation of NeuroVal-3D across multiple datasets and cross-dataset transfer scenarios.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Dataset Performance */}
        <motion.div initial="initial" animate="animate" variants={fadeIn} className="glass-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-bold mb-6 flex items-center"><Database className="w-5 h-5 mr-2 text-accent"/> Primary Dataset Performance</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datasetResults} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} domain={[0.8, 1]} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} 
                />
                <Legend />
                <Bar dataKey="TextBraTS" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="RadGenome" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
             <div className="bg-card/50 p-3 rounded-lg border border-border text-center">
               <div className="text-xs text-muted-foreground uppercase">TextBraTS AUROC</div>
               <div className="text-2xl font-bold text-accent">0.9961</div>
             </div>
             <div className="bg-card/50 p-3 rounded-lg border border-border text-center">
               <div className="text-xs text-muted-foreground uppercase">RadGenome AUROC</div>
               <div className="text-2xl font-bold text-secondary">0.9715</div>
             </div>
          </div>
        </motion.div>

        {/* Cross-Dataset Transfer */}
        <motion.div initial="initial" animate="animate" variants={fadeIn} className="glass-card p-6 rounded-xl border border-border flex flex-col">
          <h2 className="text-xl font-bold mb-6 flex items-center"><Network className="w-5 h-5 mr-2 text-warning"/> Cross-Dataset Transferability</h2>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {crossTransferResults.map((result, idx) => (
              <div key={idx} className="bg-background/50 p-5 rounded-xl border border-border relative overflow-hidden">
                <div className={`absolute left-0 top-0 w-1 h-full ${idx === 0 ? 'bg-warning' : 'bg-success'}`}></div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">{result.direction}</span>
                  <span className={`font-bold text-xl ${idx === 0 ? 'text-warning' : 'text-success'}`}>{result.AUROC.toFixed(4)}</span>
                </div>
                <div className="w-full bg-card rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${idx === 0 ? 'bg-warning' : 'bg-success'}`} 
                    style={{ width: `${result.AUROC * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">AUROC Performance</p>
              </div>
            ))}
            
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg flex items-start mt-4">
              <TrendingUp className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80">
                The perfect transfer score (1.0000) from RadGenome to TextBraTS demonstrates NeuroVal-3D's robust feature extraction capabilities when scaling from complex multi-modality data to simpler datasets.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
