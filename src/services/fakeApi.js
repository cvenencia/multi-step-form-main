import data from './data.json';

// Simulate a slow fetch request
export const fetchFormData = async () =>
    new Promise(resolve => setTimeout(() => resolve(data), 1000));
