// Copied word for word from docs/content.md section 2.6. Keep the text in step with that document.
import type { ToolkitGroup } from "@/lib/schemas";

export const toolkit: ToolkitGroup[] = [
  {
    group: "Core",
    items: ["Python", "Java", "SQL"],
  },
  {
    group: "Machine learning",
    items: ["Scikit-learn", "feature engineering", "model calibration", "NLP"],
  },
  {
    group: "GenAI",
    items: [
      "RAG",
      "embeddings",
      "hybrid retrieval (BM25 + RRF)",
      "cross-encoder re-ranking",
      "LLM evaluation",
    ],
  },
  {
    group: "Data",
    items: ["NumPy", "Pandas", "Plotly", "Matplotlib", "Seaborn", "Tableau", "Excel", "Streamlit"],
  },
  {
    group: "Engineering",
    items: ["Git", "GitHub Actions", "pytest", "Docker", "FastAPI", "Azure", "Databricks"],
  },
];
