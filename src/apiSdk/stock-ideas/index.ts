import axios from 'axios';
import queryString from 'query-string';
import { StockIdeaInterface, StockIdeaGetQueryInterface } from 'interfaces/stock-idea';
import { GetQueryInterface } from '../../interfaces';

export const getStockIdeas = async (query?: StockIdeaGetQueryInterface) => {
  const response = await axios.get(`/api/stock-ideas${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStockIdea = async (stockIdea: StockIdeaInterface) => {
  const response = await axios.post('/api/stock-ideas', stockIdea);
  return response.data;
};

export const updateStockIdeaById = async (id: string, stockIdea: StockIdeaInterface) => {
  const response = await axios.put(`/api/stock-ideas/${id}`, stockIdea);
  return response.data;
};

export const getStockIdeaById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stock-ideas/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStockIdeaById = async (id: string) => {
  const response = await axios.delete(`/api/stock-ideas/${id}`);
  return response.data;
};
