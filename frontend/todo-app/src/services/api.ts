import axios from 'axios';
import type { Todo } from '../types/Todo';

const API_URL = 'http://127.0.0.1:8000'; // this is your backend URL

export const api = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos/`);
    return response.data;
  },
  
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await axios.get(`${API_URL}/todos/${id}`);
    return response.data;
  },
  
  createTodo: async (todo: Todo): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/`, todo);
    return response.data;
  },
  
  updateTodo: async (id: number, todo: Todo): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/todos/${id}`, todo);
    return response.data;
  },
  
  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
  }
};