from fastapi import HTTPException
from sqlmodel import Session, select
from app.models.todo_model import ToDo, ToDoCreate


#function to post a todo
async def to_do_creat_controller(todo_data : ToDoCreate , session: Session)-> ToDo:
    todo = ToDo.model_validate(todo_data)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

#function to get all todos
async def get_all_todo_controller(session: Session):
    statements = select(ToDo)
    results = session.exec(statements).all()
    return results

#function to get a todo by ID
async def get_todo_by_id_controller(id:int , session: Session):
    todo = session.get(ToDo , id)
    if not todo:
        raise HTTPException(status_code=404, detail="ToDo not Found")
    return todo

#function to update a todo by id
async def update_todo_controller(id:int ,updated_data : ToDo ,session : Session):
    todo = session.get(ToDo , id)

    if not todo:
        raise HTTPException(status_code=404, detail = "ToDo not found")
    
    todo.completed = updated_data.completed
    todo.title = updated_data.title
    todo.description = updated_data.description

    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

#function to delete a todo by id
async def delete_todo_controller(id:int , session:Session):
    todo = session.get(ToDo , id)

    if not todo:
        raise HTTPException(status_code= 404, detail= "ToDo not found")
    
    session.delete(todo)
    session.commit()
    return {"message": f"ToDo with id:{id} deleted successfully"}