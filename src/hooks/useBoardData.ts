import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { type Column } from '../components/types';

export const useBoardData = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchColumns = () => {
    apiClient.get('/columns')
      .then((response) => {
        setColumns(response.data);
        setIsLoading(false); 
      });
  };

 
  useEffect(() => {
    fetchColumns();
  }, []);


  return { columns, isLoading, fetchColumns };
};