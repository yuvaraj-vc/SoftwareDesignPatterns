import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './Toggle';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const sidebarRef = useRef(null);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.menu-icon')) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Perform any logout logic here
        console.log('Logged out successfully');
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden">
            {/* Sidebar */}
            <div ref={sidebarRef} className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <nav className="mt-10">
                    <ul>
                        <li className="px-4 py-2">
                            <Link to="/link1" className="hover:text-gray-300">Link 1</Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link to="/link2" className="hover:text-gray-300">Link 2</Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link to="/link3" className="hover:text-gray-300">Link 3</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* Main content */}
            <div className="flex-1 flex flex-col md:ml-64">
                {/* Navbar */}
                <header className="w-full bg-blue-500 text-white flex justify-between items-center p-4">
                    <div className="text-lg font-bold">Company Name</div>
                    <div className="flex items-center">
                        <ModeToggle />
                        <button onClick={toggleSidebar} className="menu-icon md:hidden focus:outline-none ml-4">
                            <Menu />
                        </button>
                        <Button onClick={handleLogout} className="hidden md:block ml-4">Logout</Button>
                    </div>
                </header>
                {/* Content */}
                <main className="flex-1 p-4 bg-inherit text-foreground">
                    <h1 className="text-2xl mb-4">Welcome to the Dashboard</h1>
                    {/* Additional dashboard content can go here */}
                </main>
                <footer className="p-4 bg-blue-500 text-white md:hidden">
                    <Button onClick={handleLogout}>Logout</Button>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;
