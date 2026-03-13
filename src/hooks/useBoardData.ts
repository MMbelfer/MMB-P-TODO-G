import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Column } from '../components/types';

export const useBoardData = () => {
  // הסטיט
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(true); //הAI החליט שכדי לטעון גם

  //המתנה
  useEffect(() => {
    axios.get('http://localhost:3000/columns')
      .then((response) => {
        setColumns(response.data);
        setIsLoading(false); 
      });
  }, []);


  return { columns, isLoading };
};