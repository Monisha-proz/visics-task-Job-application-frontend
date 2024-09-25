import './App.css';
import AddForm from './components/AddForm/AddForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataTable from './components/UI/Datatable/DataTable';
import JobList from './components/Jobs/JobsList';
import Dashboard from './components/Dahboard/Dashboard';


function App() {
  const sampleData = [
    { name: "John Doe", age: 28, email: "john@example.com" },
    { name: "Jane Smith", age: 34, email: "jane@example.com" },
    { name: "Sam Wilson", age: 23, email: "sam@example.com" },
    { name: "Lisa Brown", age: 29, email: "lisa@example.com" },
    { name: "Paul Adams", age: 45, email: "paul@example.com" },
    { name: "Sara Black", age: 27, email: "sara@example.com" },
    { name: "Mike Ross", age: 32, email: "mike@example.com" },
    { name: "Jake White", age: 38, email: "jake@example.com" },
    { name: "Emma Blue", age: 31, email: "emma@example.com" },
    { name: "Tom Green", age: 42, email: "tom@example.com" },
  ];
  const router = createBrowserRouter([
    {
      path:'/',
      id:'root',
      children:[
        {index:true,element:<Dashboard/>},
        {path:'/table',element:<DataTable data={sampleData}/>},
        {path:'/job-list',element:<JobList data={sampleData}/>}
      ]
    }]);
  return (   
    <RouterProvider router={router} />
  );
}

export default App;
