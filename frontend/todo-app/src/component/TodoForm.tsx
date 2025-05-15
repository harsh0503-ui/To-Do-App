
//#region imports
import React, { useState } from 'react';
import type { Todo } from '../types/Todo';
import { Alert, Box, Button, Checkbox, FormControlLabel,  Grid, Paper, TextField, Typography } from '@mui/material';
import { api } from '../services/api';
//#endregion

//#region Component make Styles
//#endregion

//#region interfaces & types
interface TodoFormProps {
    todoToEdit: Todo | null;
    onTodoSaved: () => void;
    onCancelEdit: () => void;
}

const initialTodoState: Todo = {
  title: '',
  description: '',
  completed: false
};
//#endregion

//#region Function Component
const TodoForm:React.FC<TodoFormProps> = ({todoToEdit ,onTodoSaved , onCancelEdit}) => {
  //#region Component states
  const [todo, setTodo] = useState<Todo>(initialTodoState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //#endregion

  //#region Component hooks
   React.useEffect(() => {
      // Anything in here is fired on component mount.
      if (todoToEdit) {
        setTodo(todoToEdit);
      }else {
        setTodo(initialTodoState);
      }
      return () => {
          // Anything in here is fired on component unmount.
      }
    }, [todoToEdit])

   React.useEffect(() => {
      // Anything in here is fired on component update.
   });
  //#endregion

  //#region Component use Styles
  //#endregion

  //#region Component validation methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  //#endregion

  //#region Component Api methods
    try {
      if (!todo.title.trim()) {
        throw new Error('Title is required');
      }

      if (todoToEdit && todoToEdit.id) {
        await api.updateTodo(todoToEdit.id, todo);
      } else {
        await api.createTodo(todo);
      }

      setTodo(initialTodoState);
      onTodoSaved();
    } catch (error) {
      console.error('Error saving todo:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  //#endregion

  //#region Component feature methods
 
  //#endregion

  //#region Component JSX.members
  //#endregion

  //#region Component renders
  return(
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {todoToEdit ? 'Edit Todo' : 'Create New Todo'}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={todo.title}
          onChange={handleChange}
          margin="normal"
          required
          variant="outlined"
        />
        
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={todo.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          variant="outlined"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              name="completed"
              checked={todo.completed}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Completed"
          sx={{ mt: 1, mb: 2 }}
        />
        
        <Grid container spacing={2}>
          <Grid>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
            >
              {todoToEdit ? 'Update' : 'Create'}
            </Button>
          </Grid>
          {todoToEdit && (
            <Grid > 
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={onCancelEdit}
                disabled={loading}
              >
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
  //#endregion
}
//#endregion

//#region Component export
export default TodoForm;
//#endregion