from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.controllers.to_do_controller import delete_todo_controller, get_all_todo_controller, get_todo_by_id_controller, to_do_creat_controller, update_todo_controller
from app.database import get_session
from app.models.todo_model import ToDo


router = APIRouter()

@router.post("/" , response_model = ToDo)
async def create_todo(todo:ToDo , session: Session = Depends(get_session)):
   return await to_do_creat_controller(todo , session)

@router.get("/todos/", response_model=list[ToDo])
async def get_all_todo(session:Session = Depends(get_session)):
    return await get_all_todo_controller(session)


#router to get todo by id
@router.get("/todos/{id}", response_model = ToDo)
async def get_todo_by_id(id:int, session:Session = Depends(get_session)):
    return await get_todo_by_id_controller(id , session)


#router to update todo by id
@router.put("/todos/{id}", response_model = ToDo)
async def update_todo(id:int, updated_data:ToDo, session:Session = Depends(get_session)):
    return await update_todo_controller(id ,updated_data,session)

#router to delete todo by id
@router.delete("/todos/{id}")
async def delete_todo(id:int, session:Session= Depends(get_session)):
    return await delete_todo_controller(id , session)