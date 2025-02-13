from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import BlogPost
from pydantic import BaseModel

app = FastAPI()

class BlogPostSchema(BaseModel):
    title: str
    content: str

@app.post("/blog/")
def create_post(post: BlogPostSchema, db: Session = Depends(get_db)):
    new_post = BlogPost(title=post.title, content=post.content)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@app.get("/blog/")
def get_posts(db: Session = Depends(get_db)):
    return db.query(BlogPost).all()
