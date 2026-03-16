import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { type Column } from '../components/types';


export const useBoardData = () => {
  // הסטיט
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(true); //הAI החליט שכדי לטעון גם

  //המתנה
  useEffect(() => {
    apiClient.get('/columns')
      .then((response) => {
        setColumns(response.data);
        setIsLoading(false); 
      });
  }, []);


  return { columns, isLoading };
};