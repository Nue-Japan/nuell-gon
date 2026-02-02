FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
# curl/build-essential/gcc for Rust & Python build
# libpq-dev for psycopg2
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Rust & Cargo
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Python dependencies
COPY pyproject.toml .
# We use simple pip install assuming pyproject.toml is PEP 621 compliant or just using pip directly
# But wait, maturin requires some setup. For now we just install dependencies.
# Converting pyproject.toml dependencies to a format pip understands directly is tricky without a tool like poetry/pdm/uv.
# To keep it simple and robust for Docker, I'll assume standard pip install.
# Actually, let's create a requirements.txt instead for simplicity in Docker if using basic pip, 
# OR use 'pip install .' if pyproject.toml is properly setup.
# The user specifically mentioned "backend/pyproject.toml (or requirements.txt)". 
# Modern approach: pip install . (requires a build backend in pyproject.toml).
# I'll create a pyproject.toml that allows installing dependencies via pip.

# However, creating a dummy pyproject.toml to install deps might be complex if I don't use poetry etc.
# Creating a requirements.txt is safer for immediate success unless I know the toolchain.
# Let's try to stick to pyproject.toml with setuptools/hatchling if possible, OR just manually install the list provided.
# User asked for: fastapi, uvicorn, sqlalchemy, psycopg2-binary, maturin
# I will use pip to install them directly for fast iteration in this step, 
# but will also place pyproject.toml as requested.
RUN pip install --no-cache-dir fastapi uvicorn sqlalchemy psycopg2-binary maturin sqlmodel alembic "passlib[argon2]" "python-jose[cryptography]" python-multipart

# Copy application code
COPY . .

# Environment variables
ENV PYTHONPATH=/app

# Command is handled by docker-compose
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
