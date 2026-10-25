# NeuroVal-3D: Brain MRI Report Generation and Validation Framework

NeuroVal-3D is a research and educational project focused on generating radiology reports from 3D brain MRI scans and detecting potential hallucinations in AI-generated reports.

The framework combines an image-to-text generation pipeline with a multi-axis validator that checks report consistency across semantic, lexical, structural, numeric, modality, negation, and lesion-type dimensions.

> **Disclaimer:** This project is intended for research and educational purposes only. It is not a medical device and must not be used for clinical diagnosis or treatment decisions.

## Objectives

- Explore automated radiology report generation from 3D brain MRI volumes.
- Detect potential factual inconsistencies in generated reports.
- Evaluate reports using seven specialized validation axes.
- Combine validation scores using logistic-regression fusion.
- Assess validator performance using controlled report perturbations and held-out datasets.
- Present project examples and results through a web dashboard.

## System Architecture

The project documentation describes an eight-stage pipeline:

1. **Preprocessing:** Prepare MRI volumes for model input.
2. **3D Encoder:** Extract visual features from MRI volumes.
3. **Projector:** Map image features into the language model's representation space.
4. **Decoder:** Generate a draft radiology report.
5. **Multi-Axis Validator:** Evaluate report consistency using seven specialized validators.
6. **Anatomical Anchoring:** Support anatomical-region grounding.
7. **Explainability:** Provide a foundation for visual explanations.
8. **Perturbation Benchmark:** Evaluate validation performance using controlled report errors.

The project reports identify the multi-axis validator and perturbation benchmark as key contributions. Some anatomical-anchoring and explainability components are described as scaffolded or intended for future extension.

## Seven Validation Axes

| Axis | Purpose |
|---|---|
| Semantic | Measures semantic similarity between the reference and candidate reports |
| Lexical | Compares medically relevant vocabulary |
| Structural | Checks structured lesion and anatomical features |
| Numeric | Checks measurements and numerical consistency |
| Modality | Checks MRI modality references |
| Negation | Detects changes in positive and negative findings |
| Lesion Type | Checks consistency in disease and lesion categories |

A logistic-regression fusion model combines the seven scores into a unified validity score.

The documented decision rule labels scores greater than or equal to `0.5` as `VALID`; scores below `0.5` are `FLAGGED` for human review.

## Technology Stack

The project documentation describes the following technologies:

- **Frontend:** Next.js, React, TypeScript
- **Backend API:** Python, FastAPI, Pydantic
- **Deep Learning:** PyTorch, Hugging Face Transformers
- **Medical Imaging:** MONAI and related imaging libraries
- **Validation and Evaluation:** scikit-learn, spaCy, negspaCy
- **Experiments:** Jupyter notebooks and Kaggle

Refer to the frontend package configuration and notebook dependencies for the exact versions required by your local environment.

## Datasets

The experiments described in the reports use:

- **TextBraTS:** Brain MRI radiology reports.
- **RadGenome-Brain MRI:** Reports covering multiple brain conditions.
- **BraTS 2020:** 3D MRI volumes across multiple modalities.

The datasets are not included in this repository. Users must independently review the relevant dataset licences, access requirements, and research-use restrictions before downloading or using them.

## Reported Results

The project reports document the following held-out fusion AUROC results:

| Evaluation | Reported test AUROC |
|---|---:|
| TextBraTS | 0.9961 |
| RadGenome-Brain MRI | 0.9715 |
| Cross-dataset: TextBraTS to RadGenome | 0.9358 |
| Cross-dataset: RadGenome to TextBraTS | 1.0000 |

The reports also describe a Phase 2 experiment involving an image-conditioned generator built from a 3D CNN encoder, projector, and BART-base decoder.

These figures are results reported in the project documentation. They do not establish clinical accuracy, safety, or readiness for real-world medical use.

## Repository Structure

```text
WEB/
├── frontend/                 # Next.js dashboard
├── backend/                  # FastAPI backend
├── notebooks/
│   ├── minor-project1.ipynb  # Reproducible experiment notebook
│   └── minor-project2.ipynb  # Additional project experiments
├── reports/
│   ├── PHASE_1_2_REPORT.pdf
│   └── REVIEW_2_REPORT.pdf
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Python compatible with the backend dependencies
- Node.js and npm compatible with the frontend configuration
- Jupyter Notebook or JupyterLab for the experiment notebooks

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the local address printed by Next.js in your terminal.

### Backend

Open a separate terminal:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

The backend exposes a health endpoint at `/api/health` and demo endpoints for the dashboard.

**Note:** The current FastAPI file contains simulated report-generation responses and hardcoded demo cases. The dashboard API should not be mistaken for the complete ML training and inference pipeline.

### Notebooks

Open the notebooks under `notebooks/` using Jupyter or upload them to an appropriate notebook environment such as Kaggle. Install the dependencies required by each notebook and configure access to the necessary datasets.

The project also references a reproducible Kaggle notebook:

[Open the NeuroVal-3D Kaggle notebook](https://www.kaggle.com/code/vikneshwaran16032005/minor-project1)

## Project Reports

The `reports/` directory contains:

- `PHASE_1_2_REPORT.pdf` — Phase 1 validator implementation and Phase 2 generator experiments.
- `REVIEW_2_REPORT.pdf` — Project architecture, implementation, evaluation, and review documentation.

## Limitations

- AI-generated radiology reports can contain factual and anatomical errors.
- Validation scores are research metrics and do not guarantee correctness.
- Performance depends on the datasets, perturbation strategy, and evaluation setup.
- Some pipeline components remain scaffolded or are intended for future development.
- Any medical interpretation requires independent review by qualified medical professionals.

## Team

- Naveen Rajdev
- Pooja Pattar
- Vikneshwaran Marimuthu
- Vaishnavi Pagad

**Project Guide:** Prof. Prashant Narayankar  
**Academic Year:** 2025–2026
