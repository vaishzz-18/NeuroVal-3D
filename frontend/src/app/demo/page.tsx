"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertTriangle, Play, CheckCircle, Activity, Brain } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const sampleCases = [
  { id: "textbrats-1", type: "Glioma", modality: "T1CE", dims: "240x240x155" },
  { id: "radgenome-5", type: "Meningioma", modality: "T2", dims: "256x256x180" },
  { id: "demo-3", type: "Metastasis", modality: "FLAIR", dims: "256x256x160" },
  { id: "stroke-2", type: "Stroke", "modality": "DWI", "dims": "256x256x140" },
  { id: "wmd-4", "type": "White Matter Disease", "modality": "T2/FLAIR", "dims": "240x240x150" }
];

export default function DemoPage() {
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCase({
        id: "custom-upload",
        type: "Uploaded File",
        modality: "Auto-detected",
        dims: "Scanning...",
        filename: file.name
      });
      setReport(null);
    }
  };

  const handleSimulateGeneration = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ case_id: selectedCase.id })
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate report");
      }
      
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error(error);
      alert("Backend API is not running. Please start the FastAPI server.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-6">
      
      {/* LEFT PANEL: MRI Input */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <div className="glass-card p-5 rounded-xl border border-border">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Upload className="w-5 h-5 mr-2 text-accent"/> Input MRI</h2>
          
          <label className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
            <input 
              type="file" 
              accept=".nii,.nii.gz" 
              className="hidden" 
              onChange={handleFileUpload} 
            />
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">
              {selectedCase?.id === "custom-upload" ? selectedCase.filename : "Upload .nii or .nii.gz"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Max 500MB</p>
          </label>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Or Use Sample Cases</h3>
            <div className="flex flex-col gap-2">
              {sampleCases.map(c => (
                <button 
                  key={c.id}
                  onClick={() => { setSelectedCase(c); setReport(null); }}
                  className={`p-3 rounded-lg border text-left transition-colors flex justify-between items-center ${
                    selectedCase?.id === c.id ? "bg-accent/10 border-accent" : "bg-card border-border hover:border-accent/50"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-foreground">{c.type}</div>
                    <div className="text-xs text-muted-foreground">{c.id} • {c.modality}</div>
                  </div>
                  {selectedCase?.id === c.id && <CheckCircle2 className="w-4 h-4 text-accent" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedCase && (
          <div className="glass-card p-5 rounded-xl border border-border flex flex-col">
            <h2 className="text-lg font-bold mb-3 flex items-center"><Brain className="w-4 h-4 mr-2 text-secondary"/> MRI Viewer</h2>
            <div className="bg-black/50 aspect-square rounded-lg border border-border flex items-center justify-center relative overflow-hidden group">
               {/* Simulated 3D Viewer Placeholder */}
               <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-50"></div>
               <div className="text-center z-10">
                 <Brain className="w-16 h-16 text-secondary/40 mx-auto mb-2 animate-pulse" />
                 <p className="text-xs text-muted-foreground uppercase tracking-widest">{selectedCase.dims}</p>
                 <p className="text-[10px] text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Axial View • Slice 78/155</p>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* CENTER PANEL: Report Generation */}
      <div className="w-full lg:w-2/4 flex flex-col gap-4">
        <div className="glass-card p-5 rounded-xl border border-border flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center"><FileText className="w-5 h-5 mr-2 text-secondary"/> Report Generation</h2>
            <button 
              onClick={handleSimulateGeneration}
              disabled={!selectedCase || isGenerating}
              className="bg-secondary text-background font-bold px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isGenerating ? (
                <><Activity className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                <><Play className="w-4 h-4 mr-2" /> Generate Report</>
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isGenerating ? (
               <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex-1 flex flex-col items-center justify-center gap-6 py-12">
                 <div className="flex space-x-2">
                   <div className="w-3 h-3 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-3 h-3 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-3 h-3 bg-secondary rounded-full animate-bounce"></div>
                 </div>
                 <div className="text-center space-y-1">
                   <p className="font-medium text-foreground">NeuroVal-3D Pipeline Active</p>
                   <p className="text-xs text-muted-foreground">3D CNN Encoder → BART Decoder</p>
                 </div>
               </motion.div>
            ) : report ? (
              <motion.div key="report" initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} className="space-y-6">
                <div className="bg-card/50 p-4 rounded-lg border border-border">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Ground Truth Report (Reference)</h3>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">{report.groundTruth}</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Generated Report (NeuroVal-3D)</h3>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{report.generatedText}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-12">
                <FileText className="w-12 h-12 mb-3 opacity-20" />
                <p>Select a case and generate the report to view results.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT PANEL: Validation */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <div className="glass-card p-5 rounded-xl border border-border flex-1">
          <h2 className="text-xl font-bold mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-warning"/> Validation</h2>
          
          {report ? (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
              {/* Final Score */}
              <div className={`p-4 rounded-xl text-center border ${report.fusionScore >= 0.5 ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30'}`}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1 text-muted-foreground">Fusion Score</p>
                <div className={`text-4xl font-extrabold ${report.fusionScore >= 0.5 ? 'text-success' : 'text-danger'}`}>
                  {report.fusionScore.toFixed(2)}
                </div>
                <div className={`mt-2 text-xs font-bold px-2 py-1 inline-block rounded-md ${report.fusionScore >= 0.5 ? 'bg-success text-background' : 'bg-danger text-background'}`}>
                  {report.fusionScore >= 0.5 ? 'VALID REPORT' : 'FLAGGED FOR REVIEW'}
                </div>
              </div>

              {/* Hallucinations */}
              {report.hallucinations.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-danger flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> Detected Inconsistencies</h3>
                  {report.hallucinations.map((h: any, i: number) => (
                    <div key={i} className="bg-danger/5 border border-danger/20 p-3 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-danger">{h.type}</span>
                        <span className="bg-danger/20 text-danger px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{h.severity}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                         <div>
                           <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Reference</span>
                           <span className="text-foreground/80 line-through decoration-danger/50">{h.reference}</span>
                         </div>
                         <div>
                           <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Generated</span>
                           <span className="text-danger">{h.generated}</span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Radar Chart */}
              <div>
                <h3 className="text-sm font-bold text-muted-foreground mb-2">7-Axis Consistency</h3>
                <div className="h-48 -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="60%" data={report.radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="NeuroVal" dataKey="A" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground py-12 text-center h-full">
               <CheckCircle className="w-12 h-12 mb-3 opacity-20" />
               <p className="text-sm">Validation metrics will appear here after generation.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
