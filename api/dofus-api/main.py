from fastapi import FastAPI
from hero import router as hero_router

app = FastAPI()

app.include_router(hero_router, prefix="/hero", tags=["Hero"])

@app.get("/")
def read_root():
    return {"mensagem": "This is your personal API for Dofus"}

@app.get("/soma")
def somar(a: int, b: int):
    return {"resultado": a + b}