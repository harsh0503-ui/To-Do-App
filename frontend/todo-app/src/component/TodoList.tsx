/* eslint-disable @typescript-eslint/no-unused-vars */

//#region imports
import React, { useState } from 'react';
import type { Todo } from '../types/Todo';
import { Box, Checkbox, CircularProgress, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { api } from '../services/api';
//#endregion

//#region Component make Styles
//#endregion

//#region interfaces & types
interface TodoListProps {
    onEditTodo: (todo: Todo) => void;
    refreshList: () => void;
}
//#endregion

//#region Function Component
const TodoList:React.FC<TodoListProps> = ({onEditTodo ,refreshList}) => {
  //#region Component states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //#endregion

  //#region Component hooks
   React.useEffect(() => {
      // Anything in here is fired on component mount.
      const fetchTodos = async () => {
        try {
            const todosData = await api.getAllTodos();
            setTodos(todosData);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }finally {
            setLoading(false);
        }
      };
        fetchTodos();
      return () => {
          // Anything in here is fired on component unmount.
      }
    }, [refreshList])

   React.useEffect(() => {
      // Anything in here is fired on component update.
   });
  //#endregion

  //#region Component use Styles
  //#endregion

  //#region Component validation methods
  //#endregion

  //#region Component Api methods
   const handleToggleComplete = async (todo: Todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await api.updateTodo(todo.id!, updatedTodo);
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

   const handleDelete = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  //#endregion

  //#region Component feature methods
   if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  //#endregion

  //#region Component JSX.members
  //#endregion

  //#region Component renders
  return(
    <Paper elevation={2} sx={{ mt: 3, mb: 3, p: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Todo List
      </Typography>
      {todos.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center" py={2}>
          No todos found. Create one to get started!
        </Typography>
      ) : (
        <List>
          {todos.map((todo, index) => (
            <Box key={todo.id}>
              <ListItem>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  color="primary"
                />
                <ListItemText
                  primary={todo.title}
                  secondary={todo.description}
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => onEditTodo(todo)} sx={{ mr: 1 }}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" 
                        onClick={() => handleDelete(todo.id!)}
                        >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < todos.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );


  //#endregion
};
//#endregion

//#region Component export
export default TodoList;
//#endregion