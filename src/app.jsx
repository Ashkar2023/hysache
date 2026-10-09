import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import SiteLayout from './layouts/site-layout.jsx'
import CollectionsPage from './pages/collections-page.jsx'
import ContactPage from './pages/contact-page.jsx'
import HomePage from './pages/home-page.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <SiteLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'contact',
                element: <ContactPage />,
            },
            {
                path: 'collections',
                element: <CollectionsPage />,
            },
        ],
    },
])

export default function App() {
    return <RouterProvider router={router} />
}
