from fastapi import FastAPI
from app.api.v1.books import router as book_router
from app.api.v1.members import router as member_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React dev / preview
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(book_router)
app.include_router(member_router)
