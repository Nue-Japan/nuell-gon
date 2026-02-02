from typing import Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
# Import the Rust module
# Note: This requires the module to be built and installed in the environment
try:
    import nuell_gon_backend
except ImportError:
    nuell_gon_backend = None

router = APIRouter()

class CPUSpecs(BaseModel):
    cpu_cores: int
    memory_gb: int
    gpu_score: int

@router.post("/analyze")
def analyze_specs(specs: CPUSpecs) -> Any:
    """
    Analyze hardware specs using the high-performance Rust core.
    """
    if not nuell_gon_backend:
        raise HTTPException(
            status_code=500, 
            detail="Rust core module 'nuell_gon_backend' not loaded. Please build with maturin."
        )
    
    try:
        # Call Rust function
        result = nuell_gon_backend.calculate_chimera_score(
            specs.cpu_cores, 
            specs.memory_gb, 
            specs.gpu_score
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
