use pyo3::prelude::*;
use std::collections::HashMap;

/// Calculates the Chimera Sync Score based on hardware specs.
/// Returns a dictionary with detailed metrics.
#[pyfunction]
fn calculate_chimera_score(py: Python, cpu_cores: i32, memory_gb: i32, gpu_score: i32) -> PyResult<HashMap<String, PyObject>> {
    let mut results = HashMap::new();

    // 1. Core Logic: Simulate complex calculation
    // Formula: (Cores * 2.5) + (Memory * 1.8) + (GPU * 0.5) + (NoiseFactor)
    
    // Normalize inputs roughly to 100 scale
    let core_factor = (cpu_cores as f64) * 2.5; 
    let mem_factor = (memory_gb as f64) * 1.2;
    let gpu_factor = (gpu_score as f64) * 0.4;
    
    // Bitwise noise simulation (deterministic based on input)
    let noise = ((cpu_cores ^ memory_gb ^ gpu_score) % 10) as f64;
    
    let raw_score = core_factor + mem_factor + gpu_factor + noise;
    
    // Cap at 100.0, Min 10.0
    let final_score = if raw_score > 100.0 { 
        99.9 
    } else if raw_score < 10.0 { 
        10.5 
    } else { 
        raw_score 
    };

    // 2. Rank Determination
    let rank = if final_score >= 90.0 {
        "S-Class (Chimera)"
    } else if final_score >= 75.0 {
        "A-Class (Nue)"
    } else if final_score >= 50.0 {
        "B-Class (Beast)"
    } else {
        "C-Class (Dormant)"
    };

    // Modern PyO3 conversion using into_py(py)
    results.insert("score".to_string(), final_score.into_py(py));
    results.insert("rank".to_string(), rank.into_py(py));
    results.insert("metrics".to_string(), format!("CPU:{:.1} MEM:{:.1} GPU:{:.1}", core_factor, mem_factor, gpu_factor).into_py(py));

    Ok(results)
}

/// A Python module implemented in Rust.
#[pymodule]
fn nuell_gon_backend(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(calculate_chimera_score, m)?)?;
    Ok(())
}