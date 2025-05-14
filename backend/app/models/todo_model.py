from typing import Optional

from sqlmodel import Field, SQLModel


class ToDoBase(SQLModel):
    title:str
    description: Optional[str] = None
    completed: bool = False
    

class ToDo(ToDoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
class ToDoCreate(ToDoBase):
    pass 