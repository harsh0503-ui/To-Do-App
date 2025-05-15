
import { AppBar, Box, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';
import './App.css'
import TodoList from './component/TodoList'
import TodoForm from './component/TodoForm';
import { useState } from 'react';
import type { Todo } from './types/Todo';

// Themnes
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [refreshList, setRefreshList] = useState<boolean>(false);

    const handleEditTodo = (todo: Todo) => {
    setTodoToEdit(todo);
  };

  const handleTodoSaved = () => {
    setTodoToEdit(null);
    setRefreshList(!refreshList);
  };

  const handleCancelEdit = () => {
    setTodoToEdit(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <TodoForm 
          todoToEdit={todoToEdit} 
          onTodoSaved={handleTodoSaved} 
          onCancelEdit={handleCancelEdit} 
        />
        <TodoList 
          onEditTodo={handleEditTodo} 
          refreshList={() => setRefreshList(!refreshList)} 
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
