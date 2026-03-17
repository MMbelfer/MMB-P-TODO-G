import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { type Column } from '../components/types';

export const useBoardData = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchColumns = () => {
  
    apiClient.get('/columns?_embed=tasks')
      .then((response) => {
        setColumns(response.data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  return { columns, isLoading, fetchColumns };
};