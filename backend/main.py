from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import random

app = FastAPI(title="NeuroVal-3D API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    case_id: str

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "NeuroVal-3D API is running"}

@app.get("/api/demo-cases")
async def get_demo_cases():
    return {
        "cases": [
            { "id": "textbrats-1", "type": "Glioma", "modality": "T1CE", "dims": "240x240x155" },
            { "id": "radgenome-5", "type": "Meningioma", "modality": "T2", "dims": "256x256x180" },
            { "id": "demo-3", "type": "Metastasis", "modality": "FLAIR", "dims": "256x256x160" },
            { "id": "stroke-2", "type": "Stroke", "modality": "DWI", "dims": "256x256x140" },
            { "id": "wmd-4", "type": "White Matter Disease", "modality": "T2/FLAIR", "dims": "240x240x150" }
        ]
    }

@app.post("/api/generate")
async def generate_report(request: GenerateRequest):
    # Simulate pipeline latency
    await asyncio.sleep(2.5)

    if request.case_id == "textbrats-1":
        return {
            "generatedText": "Findings: There is a large heterogeneously enhancing mass in the left frontal lobe. The mass exhibits central necrosis and is surrounded by significant vasogenic edema causing mass effect and midline shift. \n\nImpression: Features are consistent with a high-grade glioma (glioblastoma).",
            "groundTruth": "Findings: A large, irregularly enhancing mass is present in the right frontal lobe with central non-enhancing regions indicative of necrosis. Extensive surrounding vasogenic edema is noted with associated right-to-left midline shift. \n\nImpression: High-grade glioma in the right frontal lobe.",
            "fusionScore": 0.42,
            "radarData": [
                { "subject": "Semantic", "A": 96, "fullMark": 100 },
                { "subject": "Lexical", "A": 85, "fullMark": 100 },
                { "subject": "Structural", "A": 92, "fullMark": 100 },
                { "subject": "Numeric", "A": 100, "fullMark": 100 },
                { "subject": "Modality", "A": 98, "fullMark": 100 },
                { "subject": "Negation", "A": 99, "fullMark": 100 },
                { "subject": "Lesion Type", "A": 95, "fullMark": 100 },
            ],
            "hallucinations": [
                { "type": "Laterality Error", "reference": "Right Frontal Lobe", "generated": "Left Frontal Lobe", "severity": "Critical" }
            ]
        }
    elif request.case_id == "radgenome-5":
        return {
            "generatedText": "Findings: A well-circumscribed extra-axial mass is seen along the left sphenoid wing, demonstrating homogeneous enhancement. No significant adjacent brain edema. \n\nImpression: Meningioma.",
            "groundTruth": "Findings: A well-circumscribed extra-axial mass is seen along the left sphenoid wing, demonstrating homogeneous enhancement. No significant adjacent brain edema. \n\nImpression: Meningioma.",
            "fusionScore": 0.98,
            "radarData": [
                { "subject": "Semantic", "A": 99, "fullMark": 100 },
                { "subject": "Lexical", "A": 95, "fullMark": 100 },
                { "subject": "Structural", "A": 98, "fullMark": 100 },
                { "subject": "Numeric", "A": 100, "fullMark": 100 },
                { "subject": "Modality", "A": 100, "fullMark": 100 },
                { "subject": "Negation", "A": 100, "fullMark": 100 },
                { "subject": "Lesion Type", "A": 100, "fullMark": 100 },
            ],
            "hallucinations": []
        }
    elif request.case_id == "demo-3":
        return {
            "generatedText": "Findings: Multiple ring-enhancing lesions are seen at the grey-white matter junction bilaterally, with extensive surrounding edema. \n\nImpression: Metastatic disease.",
            "groundTruth": "Findings: Multiple ring-enhancing lesions at the grey-white matter junction bilaterally, with extensive surrounding edema. \n\nImpression: Metastatic disease.",
            "fusionScore": 0.95,
            "radarData": [
                { "subject": "Semantic", "A": 94, "fullMark": 100 },
                { "subject": "Lexical", "A": 90, "fullMark": 100 },
                { "subject": "Structural", "A": 95, "fullMark": 100 },
                { "subject": "Numeric", "A": 96, "fullMark": 100 },
                { "subject": "Modality", "A": 98, "fullMark": 100 },
                { "subject": "Negation", "A": 99, "fullMark": 100 },
                { "subject": "Lesion Type", "A": 95, "fullMark": 100 },
            ],
            "hallucinations": []
        }
    elif request.case_id == "stroke-2":
        return {
            "generatedText": "Findings: There is an area of restricted diffusion in the right middle cerebral artery (MCA) territory, involving the basal ganglia and insula, without any hemorrhage. \n\nImpression: Acute ischemic stroke in the right MCA territory.",
            "groundTruth": "Findings: Area of restricted diffusion is noted in the right MCA territory involving the basal ganglia and insular ribbon. No evidence of hemorrhage. \n\nImpression: Acute right MCA territory infarct.",
            "fusionScore": 0.96,
            "radarData": [
                { "subject": "Semantic", "A": 97, "fullMark": 100 },
                { "subject": "Lexical", "A": 88, "fullMark": 100 },
                { "subject": "Structural", "A": 94, "fullMark": 100 },
                { "subject": "Numeric", "A": 100, "fullMark": 100 },
                { "subject": "Modality", "A": 100, "fullMark": 100 },
                { "subject": "Negation", "A": 99, "fullMark": 100 },
                { "subject": "Lesion Type", "A": 100, "fullMark": 100 },
            ],
            "hallucinations": []
        }
    else:
        return {
            "generatedText": "Findings: There is marked periventricular and deep white matter hyperintensity on FLAIR imaging. \n\nImpression: Moderate to severe small vessel ischemic disease.",
            "groundTruth": "Findings: Confluent periventricular and deep white matter hyperintensities are identified on FLAIR sequences. \n\nImpression: Severe chronic microvascular ischemic white matter disease.",
            "fusionScore": 0.88,
            "radarData": [
                { "subject": "Semantic", "A": 85, "fullMark": 100 },
                { "subject": "Lexical", "A": 78, "fullMark": 100 },
                { "subject": "Structural", "A": 88, "fullMark": 100 },
                { "subject": "Numeric", "A": 100, "fullMark": 100 },
                { "subject": "Modality", "A": 100, "fullMark": 100 },
                { "subject": "Negation", "A": 100, "fullMark": 100 },
                { "subject": "Lesion Type", "A": 89, "fullMark": 100 },
            ],
            "hallucinations": [
                { "type": "Severity Mismatch", "reference": "Severe chronic", "generated": "Moderate to severe", "severity": "Low" }
            ]
        }
