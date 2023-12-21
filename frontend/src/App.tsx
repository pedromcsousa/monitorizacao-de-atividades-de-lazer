import Home from './pages/Home/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import History from './pages/History/History'


let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/history/:tag",
    element: <History />,
  }
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default App


if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
