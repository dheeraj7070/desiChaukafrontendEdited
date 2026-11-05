'use server'

import {Category} from '@/types/category'


export  async function  getCategories() {
  const data: Category[] = [
    {
      keyword: 'latest',
      title: 'Latest',
      id: 'lattest:latest',
    },
    {
      keyword: 'oldest',
      title: 'Oldest',
      id: 'oldest:oldest'
    },
    {
      keyword: 'latest',
      title: 'Popular',
      id: 'latest:popular'
    }
  ]
  //  const promise = new Promise((resolve, reject) => {
  //   setTimeout(() => resolve(data), 2000);
  //  });
   return await data;
}

