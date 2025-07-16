import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import '../Assets/scss/admin.css';
import { Link } from 'react-router-dom';
import ProfileImg from '../Assets/Images/profile-img.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Admin() {
    // Static mock data for permissions and name
    const permissions = {
        dashboard: ['view'],
        // orders: ['view'],
        // users: ['view'],
        role: ['view'],
        // payment: ['view'],
        products: ['view'],
        category: ['view'],
        brand: ['view'],
        size: ['view'],
        color: ['view'],
        // Add more as needed
        0: ['*'] // Simulate super admin
    };
    const [name, setName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        } else {
            setName('Admin');
        }
    }, []);

    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 992 ? false : false); // false: open on desktop, closed on mobile by default
    const location = useLocation();
    const sidebarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [menuState, setMenuState] = useState({
        product: false,
        category: false,
        ecommerce: false,
    });
    const toggleMenu = (menu, event) => {
        event.stopPropagation();
        setMenuState((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };
    // Remove logout logic (no real auth)
    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        toast.success("Logged out", { autoClose: 1500 });
        setTimeout(() => {
            navigate("/login");
        }, 1600)
    };
    // Responsive sidebar: always open on desktop, togglable on mobile
    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth >= 992;
            setIsDesktop(desktop);
            if (desktop) {
                setIsOpen(false); // always open on desktop
            }
        };
        window.addEventListener('resize', handleResize);
        // Set initial state
        const desktop = window.innerWidth >= 992;
        setIsDesktop(desktop);
        if (desktop) {
            setIsOpen(false);
        }
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on route change (mobile only)
    useEffect(() => {
        if (!isDesktop) {
            setIsOpen(false);
        }
    }, [location.pathname, isDesktop]);

    // Function to close sidebar (can be passed to children for cancel/edit actions)
    const closeSidebar = () => {
        if (!isDesktop) {
            setIsOpen(false);
        }
    };

    // Calculate sidebar width for desktop
    const getMainSectionMargin = () => {
        if (isDesktop) {
            // On desktop, sidebar is always open
            return { marginLeft: '350px' };
        } else {
            // On mobile, sidebar overlays, so margin-left is 0
            return { marginLeft: '0' };
        }
    };

    // Calculate navbar left position for desktop
    const getNavbarStyle = () => {
        if (isDesktop) {
            return { left: '360px' };
        } else {
            return { left: '0' };
        }
    };

    return (
        <>
            <div>
                <div className="container d-flex p-0">
                    <div className='dashboard-icon-sec d-none d-lg-block'>
                        {/* Sidebar Section - always show all */}
                        <NavLink to='/' className={({ isActive }) => isActive ? 'dash-icon-wrapper active' : 'dash-icon-wrapper'}>
                            <svg aria-hidden="true" role="img" className="iconify iconify--solar" width="20" height="25" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" d="M14.5 6.5h3m0 0h3m-3 0v3m0-3v-3"></path>
                                    <path d="M2.5 6.5c0-1.886 0-2.828.586-3.414S4.614 2.5 6.5 2.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 8.386 2.5 6.5Zm11 11c0-1.886 0-2.828.586-3.414s1.528-.586 3.414-.586s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586s-.586-1.528-.586-3.414Z"></path>
                                    <path d="M2.5 17.5c0-1.886 0-2.828.586-3.414S4.614 13.5 6.5 13.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 19.386 2.5 17.5Z" opacity=".5"></path>
                                </g>
                            </svg>
                        </NavLink>
                        {/* <NavLink to='/order' className={({ isActive }) => isActive ? 'dash-icon-wrapper active' : 'dash-icon-wrapper'}>
                            <svg aria-hidden="true" role="img" className="iconify iconify--solar" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M9.94 3.25h4.12c1.841 0 3.3 0 4.44.153c1.175.158 2.125.49 2.875 1.238c1.114 1.112 1.32 2.687 1.375 4.834c.018.736-.564 1.188-1.051 1.316a1.25 1.25 0 0 0 0 2.419c.487.127 1.07.579 1.05 1.315c-.054 2.147-.26 3.722-1.374 4.834c-.75.748-1.7 1.08-2.874 1.238c-1.141.153-2.6.153-4.44.153H9.94c-1.841 0-3.3 0-4.44-.153c-1.175-.158-2.125-.49-2.875-1.238c-1.114-1.112-1.32-2.687-1.375-4.834c-.018-.736.564-1.188 1.051-1.316a1.25 1.25 0 0 0 0-2.419c-.487-.127-1.07-.578-1.05-1.315c.054-2.147.26-3.722 1.374-4.834c.75-.748 1.7-1.08 2.874-1.238C6.641 3.25 8.1 3.25 9.94 3.25Zm1.074 5.55c.172-.225.484-.55.986-.55s.814.325.986.55c.165.214.33.511.5.816l.023.041l.098.177l.057.1l.099.023l.19.043l.048.01c.327.075.653.148.903.247c.276.109.65.32.795.785c.142.455-.037.841-.193 1.09c-.145.23-.365.486-.59.749l-.03.035l-.13.153l-.082.097l.012.135l.02.203l.004.046c.034.352.067.692.055.964c-.012.286-.08.718-.468 1.011c-.4.304-.84.238-1.12.157c-.258-.073-.562-.214-.87-.355l-.043-.02l-.18-.083l-.084-.039l-.085.04l-.179.082l-.044.02c-.306.141-.61.282-.869.355c-.28.08-.72.147-1.12-.157c-.387-.293-.456-.725-.468-1.01c-.012-.273.02-.613.055-.965l.004-.046l.02-.203l.013-.135l-.083-.097l-.13-.153l-.03-.035c-.225-.263-.445-.52-.59-.75c-.156-.248-.335-.634-.193-1.09c.144-.463.519-.675.795-.784c.25-.099.576-.172.903-.246l.047-.01l.191-.044l.1-.023l.056-.1l.098-.177l.023-.041c.17-.305.335-.602.5-.816Z" />
                            </svg>
                        </NavLink> */}
                        {/* <NavLink to='/user' className={({ isActive }) => isActive ? 'dash-icon-wrapper active' : 'dash-icon-wrapper'}>
                            <svg aria-hidden="true" role="img" className="iconify iconify--solar" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                                <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                    <path d="M9.25 9a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0M12 7.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m0 4.5c-1.196 0-2.315.24-3.164.665c-.803.402-1.586 1.096-1.586 2.085v.063c-.002.51-.004 1.37.81 1.959c.378.273.877.448 1.495.559c.623.112 1.422.169 2.445.169s1.822-.057 2.445-.169c.618-.111 1.117-.286 1.495-.56c.814-.589.812-1.448.81-1.959V15c0-.99-.783-1.683-1.586-2.085c-.849-.424-1.968-.665-3.164-.665M8.75 15c0-.115.113-.421.757-.743c.6-.3 1.48-.507 2.493-.507s1.894.207 2.493.507c.644.322.757.628.757.743c0 .604-.039.697-.19.807c-.122.088-.373.206-.88.298c-.502.09-1.203.145-2.18.145s-1.678-.055-2.18-.145c-.507-.092-.758-.21-.88-.298c-.152-.11-.19-.203-.19-.807" />
                                    <path d="M8.723 2.051c1.444-.494 2.34-.801 3.277-.801s1.833.307 3.277.801l.727.25c1.481.506 2.625.898 3.443 1.23c.412.167.767.33 1.052.495c.275.16.55.359.737.626c.185.263.281.587.341.9c.063.324.1.713.125 1.16c.048.886.048 2.102.048 3.678v1.601c0 6.101-4.608 9.026-7.348 10.224l-.027.011c-.34.149-.66.288-1.027.382c-.387.1-.799.142-1.348.142c-.55 0-.96-.042-1.348-.142c-.367-.094-.687-.233-1.027-.382l-.027-.011C6.858 21.017 2.25 18.092 2.25 11.99v-1.6c0-1.576 0-2.792.048-3.679c.025-.446.062-.835.125-1.16c.06-.312.156-.636.34-.9c.188-.266.463-.465.738-.625c.285-.165.64-.328 1.052-.495c.818-.332 1.962-.724 3.443-1.23zM12 2.75c-.658 0-1.305.212-2.92.764l-.572.196c-1.513.518-2.616.896-3.39 1.21a7 7 0 0 0-.864.404a2 2 0 0 0-.208.139a.4.4 0 0 0-.055.05a.4.4 0 0 0-.032.074q-.03.082-.063.248a7 7 0 0 0-.1.958c-.046.841-.046 2.015-.046 3.624v1.574c0 5.176 3.87 7.723 6.449 8.849c.371.162.586.254.825.315c.228.059.506.095.976.095s.748-.036.976-.095c.24-.06.454-.153.825-.315c2.58-1.126 6.449-3.674 6.449-8.849v-1.574c0-1.609 0-2.783-.046-3.624a7 7 0 0 0-.1-.958a2 2 0 0 0-.063-.248a.4.4 0 0 0-.032-.074a.4.4 0 0 0-.055-.05a2 2 0 0 0-.208-.14a7 7 0 0 0-.864-.402c-.774-.315-1.877-.693-3.39-1.21l-.573-.197C13.305 2.962 12.658 2.75 12 2.75" />
                                </g>
                            </svg>
                        </NavLink> */}
                        <NavLink to='/role' className={({ isActive }) => isActive ? 'dash-icon-wrapper active' : 'dash-icon-wrapper'}>
                            <svg aria-hidden="true" role="img" className="iconify iconify--solar" width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.133A9.96 9.96 0 0 0 12 22Z" />
                                    <path d="M8 10.5h8M8 14h5.5" strokeLinecap="round" opacity="0.5" />
                                </g>
                            </svg>
                        </NavLink>
                        {/* <NavLink to='/payment' className={({ isActive }) => isActive ? 'dash-icon-wrapper active' : 'dash-icon-wrapper'}>
                            <svg aria-hidden="true" role="img" className="iconify iconify--solar" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.099 1.25H16.9c1.017 0 1.717 0 2.306.204a3.8 3.8 0 0 1 2.348 2.412l-.713.234l.713-.234c.196.597.195 1.307.195 2.36v14.148c0 1.466-1.727 2.338-2.864 1.297a.196.196 0 0 0-.271 0l-.484.442c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0l-.483-.442a.196.196 0 0 0-.272 0c-1.137 1.04-2.864.169-2.864-1.297V6.227c0-1.054 0-1.764.195-2.361a3.8 3.8 0 0 1 2.348-2.412c.59-.205 1.289-.204 2.306-.204m.146 1.5c-1.221 0-1.642.01-1.96.121A2.3 2.3 0 0 0 3.87 4.334c-.111.338-.12.784-.12 2.036v14.004c0 .12.059.192.134.227a.2.2 0 0 0 .11.018a.2.2 0 0 0 .107-.055a1.695 1.695 0 0 1 2.296 0l.483.442a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0l.483-.442a1.695 1.695 0 0 1 2.296 0c.043.04.08.052.108.055a.2.2 0 0 0 .109-.018c.075-.035.135-.108.135-.227V6.37c0-1.252-.01-1.698-.12-2.037a2.3 2.3 0 0 0-1.416-1.462c-.317-.11-.738-.12-1.959-.12zM15 7.44a.75.75 0 0 1 .06 1.06l-3.572 4a.75.75 0 0 1-1.119 0l-1.428-1.6a.75.75 0 0 1 1.118-1l.87.974l3.012-3.373A.75.75 0 0 1 15 7.44M6.75 15.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75" />
                            </svg>
                        </NavLink> */}
                    </div>
                    <section id="toggle-section" className={isDesktop || isOpen ? "open" : "closed"} ref={sidebarRef}>
                        <div className="Nav-content">
                            <div className="navbar-nav mb-2 mb-lg-0 pt-2">
                                <div className="d-flex justify-content-between">
                                    <p className='brand'>ShoesX</p>
                                    {/* Only show close button on mobile */}
                                    {!isDesktop && (
                                        <button className="close-btn" onClick={closeSidebar}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <ul className="list-section">
                                        <li className="item">
                                            <Link
                                                to="/"
                                                className={`item-btn ${location.pathname === "/" ? "active" : ""}`}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="img"
                                                    className="iconify iconify--solar mb-1 me-2"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path strokeLinecap="round" d="M14.5 6.5h3m0 0h3m-3 0v3m0-3v-3"></path>
                                                        <path d="M2.5 6.5c0-1.886 0-2.828.586-3.414S4.614 2.5 6.5 2.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 8.386 2.5 6.5Zm11 11c0-1.886 0-2.828.586-3.414s1.528-.586 3.414-.586s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586s-.586-1.528-.586-3.414Z"></path>
                                                        <path d="M2.5 17.5c0-1.886 0-2.828.586-3.414S4.614 13.5 6.5 13.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 19.386 2.5 17.5Z" opacity=".5"></path>
                                                    </g>
                                                </svg>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className='item'>
                                            <div
                                                className={`d-flex justify-content-between item-btn ${location.pathname.startsWith("/product") ? "active" : ""}`}
                                                onClick={(e) => toggleMenu("ecommerce", e)}
                                            >
                                                <button onClick={(e) => toggleMenu("ecommerce", e)} className='ecommerce-btn'>
                                                    <svg
                                                        aria-hidden="true"
                                                        role="img"
                                                        className="iconify iconify--solar"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                    >
                                                        <g>
                                                            <path d="M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301S6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154s.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91Z" />
                                                            <path
                                                                d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4"
                                                                opacity=".5"
                                                            />
                                                            <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M8 13v4m8-4v4m-4-4v4"
                                                                opacity=".5"
                                                            />
                                                        </g>
                                                    </svg>
                                                    <span className='ecommerce-txt'>Ecommerce</span>
                                                    <span className={`bi ${menuState.ecommerce ? "bi-chevron-up" : "bi-chevron-down"}`}></span>
                                                </button>
                                            </div>
                                            {menuState.ecommerce && (
                                                <ul className="submenu">
                                                    {(permissions?.products?.includes("view") || permissions?.[0]?.includes("*")) && (
                                                        <li>
                                                            <Link to="/product" className={` ${location.pathname === "/product" ? "active" : ""}`}>Product</Link>
                                                        </li>
                                                    )}
                                                    {(permissions?.category?.includes("view") || permissions?.[0]?.includes("*")) && (
                                                        <li>
                                                            <Link to="/product/category" className={`${location.pathname === "/product/category" ? "active" : ""}`}>Category</Link>
                                                        </li>
                                                    )}
                                                    {(permissions?.brand?.includes("view") || permissions?.[0]?.includes("*")) && (
                                                        <li>
                                                            <Link to="/product/brand" className={`${location.pathname === "/product/brand" ? "active" : ""}`}>Brand</Link>
                                                        </li>
                                                    )}
                                                    {(permissions?.size?.includes("view") || permissions?.[0]?.includes("*")) && (
                                                        <li>
                                                            <Link to="/product/size" className={`${location.pathname === "/product/size" ? "active" : ""}`}>Size</Link>
                                                        </li>
                                                    )}
                                                    {(permissions?.color?.includes("view") || permissions?.[0]?.includes("*")) && (
                                                        <li>
                                                            <Link to="/color" className={`${location.pathname === "/color" ? "active" : ""}`}>Color</Link>
                                                        </li>
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                        {/* <li className="item">
                                            <Link
                                                to="/order"
                                                className={`item-btn ${location.pathname.startsWith("/order") ? "active" : ""}`}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="img"
                                                    className="iconify iconify--solar mb-1 me-2"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M9.94 3.25h4.12c1.841 0 3.3 0 4.44.153c1.175.158 2.125.49 2.875 1.238c1.114 1.112 1.32 2.687 1.375 4.834c.018.736-.564 1.188-1.051 1.316a1.25 1.25 0 0 0 0 2.419c.487.127 1.07.579 1.05 1.315c-.054 2.147-.26 3.722-1.374 4.834c-.75.748-1.7 1.08-2.874 1.238c-1.141.153-2.6.153-4.44.153H9.94c-1.841 0-3.3 0-4.44-.153c-1.175-.158-2.125-.49-2.875-1.238c-1.114-1.112-1.32-2.687-1.375-4.834c-.018-.736.564-1.188 1.051-1.316a1.25 1.25 0 0 0 0-2.419c-.487-.127-1.07-.578-1.05-1.315c.054-2.147.26-3.722 1.374-4.834c.75-.748 1.7-1.08 2.874-1.238C6.641 3.25 8.1 3.25 9.94 3.25Zm1.074 5.55c.172-.225.484-.55.986-.55s.814.325.986.55c.165.214.33.511.5.816l.023.041l.098.177l.057.1l.099.023l.19.043l.048.01c.327.075.653.148.903.247c.276.109.65.32.795.785c.142.455-.037.841-.193 1.09c-.145.23-.365.486-.59.749l-.03.035l-.13.153l-.082.097l.012.135l.02.203l.004.046c.034.352.067.692.055.964c-.012.286-.08.718-.468 1.011c-.4.304-.84.238-1.12.157c-.258-.073-.562-.214-.87-.355l-.043-.02l-.18-.083l-.084-.039l-.085.04l-.179.082l-.044.02c-.306.141-.61.282-.869.355c-.28.08-.72.147-1.12-.157c-.387-.293-.456-.725-.468-1.01c-.012-.273.02-.613.055-.965l.004-.046l.02-.203l.013-.135l-.083-.097l-.13-.153l-.03-.035c-.225-.263-.445-.52-.59-.75c-.156-.248-.335-.634-.193-1.09c.144-.463.519-.675.795-.784c.25-.099.576-.172.903-.246l.047-.01l.191-.044l.1-.023l.056-.1l.098-.177l.023-.041c.17-.305.335-.602.5-.816Z"
                                                    />
                                                </svg>
                                                Order
                                            </Link>
                                        </li> */}
                                        {/* <li className="item">
                                            <Link
                                                to="/user"
                                                className={`item-btn ${location.pathname.startsWith("/user") ? "active" : ""}`}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="img"
                                                    className="iconify iconify--solar mb-1 me-2"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                                        <path d="M9.25 9a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0M12 7.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m0 4.5c-1.196 0-2.315.24-3.164.665c-.803.402-1.586 1.096-1.586 2.085v.063c-.002.51-.004 1.37.81 1.959c.378.273.877.448 1.495.559c.623.112 1.422.169 2.445.169s1.822-.057 2.445-.169c.618-.111 1.117-.286 1.495-.56c.814-.589.812-1.448.81-1.959V15c0-.99-.783-1.683-1.586-2.085c-.849-.424-1.968-.665-3.164-.665M8.75 15c0-.115.113-.421.757-.743c.6-.3 1.48-.507 2.493-.507s1.894.207 2.493.507c.644.322.757.628.757.743c0 .604-.039.697-.19.807c-.122.088-.373.206-.88.298c-.502.09-1.203.145-2.18.145s-1.678-.055-2.18-.145c-.507-.092-.758-.21-.88-.298c-.152-.11-.19-.203-.19-.807" />
                                                        <path d="M8.723 2.051c1.444-.494 2.34-.801 3.277-.801s1.833.307 3.277.801l.727.25c1.481.506 2.625.898 3.443 1.23c.412.167.767.33 1.052.495c.275.16.55.359.737.626c.185.263.281.587.341.9c.063.324.1.713.125 1.16c.048.886.048 2.102.048 3.678v1.601c0 6.101-4.608 9.026-7.348 10.224l-.027.011c-.34.149-.66.288-1.027.382c-.387.1-.799.142-1.348.142c-.55 0-.96-.042-1.348-.142c-.367-.094-.687-.233-1.027-.382l-.027-.011C6.858 21.017 2.25 18.092 2.25 11.99v-1.6c0-1.576 0-2.792.048-3.679c.025-.446.062-.835.125-1.16c.06-.312.156-.636.34-.9c.188-.266.463-.465.738-.625c.285-.165.64-.328 1.052-.495c.818-.332 1.962-.724 3.443-1.23zM12 2.75c-.658 0-1.305.212-2.92.764l-.572.196c-1.513.518-2.616.896-3.39 1.21a7 7 0 0 0-.864.404a2 2 0 0 0-.208.139a.4.4 0 0 0-.055.05a.4.4 0 0 0-.032.074q-.03.082-.063.248a7 7 0 0 0-.1.958c-.046.841-.046 2.015-.046 3.624v1.574c0 5.176 3.87 7.723 6.449 8.849c.371.162.586.254.825.315c.228.059.506.095.976.095s.748-.036.976-.095c.24-.06.454-.153.825-.315c2.58-1.126 6.449-3.674 6.449-8.849v-1.574c0-1.609 0-2.783-.046-3.624a7 7 0 0 0-.1-.958a2 2 0 0 0-.063-.248a.4.4 0 0 0-.032-.074a.4.4 0 0 0-.055-.05a2 2 0 0 0-.208-.14a7 7 0 0 0-.864-.402c-.774-.315-1.877-.693-3.39-1.21l-.573-.197C13.305 2.962 12.658 2.75 12 2.75" />
                                                    </g>
                                                </svg>
                                                Users
                                            </Link>
                                        </li> */}
                                        <li className="item">
                                            <Link
                                                to="/role"
                                                className={`item-btn ${location.pathname.startsWith("/role") ? "active" : ""}`}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="img"
                                                    className="iconify iconify--solar mb-1 me-2"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.133A9.96 9.96 0 0 0 12 22Z" />
                                                        <path
                                                            d="M8 10.5h8M8 14h5.5"
                                                            strokeLinecap="round"
                                                            opacity="0.5"
                                                        />
                                                    </g>
                                                </svg>
                                                Role
                                            </Link>
                                        </li>
                                        {/* <li className="item">
                                            <Link
                                                to="/payment"
                                                className={`item-btn ${location.pathname.startsWith("/payment") ? "active" : ""}`}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    role="img"
                                                    className="iconify iconify--solar mb-1 me-2"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.099 1.25H16.9c1.017 0 1.717 0 2.306.204a3.8 3.8 0 0 1 2.348 2.412l-.713.234l.713-.234c.196.597.195 1.307.195 2.36v14.148c0 1.466-1.727 2.338-2.864 1.297a.196.196 0 0 0-.271 0l-.484.442c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0a.907.907 0 0 0-1.238 0c-.928.85-2.334.85-3.262 0l-.483-.442a.196.196 0 0 0-.272 0c-1.137 1.04-2.864.169-2.864-1.297V6.227c0-1.054 0-1.764.195-2.361a3.8 3.8 0 0 1 2.348-2.412c.59-.205 1.289-.204 2.306-.204m.146 1.5c-1.221 0-1.642.01-1.96.121A2.3 2.3 0 0 0 3.87 4.334c-.111.338-.12.784-.12 2.036v14.004c0 .12.059.192.134.227a.2.2 0 0 0 .11.018a.2.2 0 0 0 .107-.055a1.695 1.695 0 0 1 2.296 0l.483.442a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0a2.407 2.407 0 0 1 3.262 0a.907.907 0 0 0 1.238 0l.483-.442a1.695 1.695 0 0 1 2.296 0c.043.04.08.052.108.055a.2.2 0 0 0 .109-.018c.075-.035.135-.108.135-.227V6.37c0-1.252-.01-1.698-.12-2.037a2.3 2.3 0 0 0-1.416-1.462c-.317-.11-.738-.12-1.959-.12zM15 7.44a.75.75 0 0 1 .06 1.06l-3.572 4a.75.75 0 0 1-1.119 0l-1.428-1.6a.75.75 0 0 1 1.118-1l.87.974l3.012-3.373A.75.75 0 0 1 15 7.44M6.75 15.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75"
                                                    />
                                                </svg>
                                                Payment
                                            </Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="main-section" style={getMainSectionMargin()}>
                        <nav className="navbar navbar-expand-lg" style={getNavbarStyle()}>
                            <div className={`d-flex justify-content-between align-items-center responsive-width ${(isDesktop || isOpen) ? "open" : "closed"}`}
                                id="navbar-width">
                                <div className="d-block d-lg-none">
                                    <button className="navbar-toggler Navbar-toggler" onClick={() => setIsOpen((prev) => !prev)}>
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                                <div className='d-none d-lg-flex'>
                                    <div className='d-none d-lg-block'>
                                        <i
                                            className="bi bi-list"
                                            onClick={() => setIsOpen((prev) => !prev)}
                                            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                        ></i>
                                    </div>
                                    <div className="search-sec">
                                        <button
                                            className="search-icon"
                                            onClick={() => setShowModal(true)}
                                        >
                                            <i className="bi bi-search"></i>
                                        </button>
                                        {showModal && (
                                            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-modal="true" role="dialog">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <input type='text' className='modal-search-bar'></input>
                                                        </div>
                                                        <div className="modal-body text-start">
                                                            <>
                                                                <p className='modal-title mb-3'>Quick Page Links</p>
                                                                <>
                                                                    <Link to='/product' className='modal-link'>Product</Link>
                                                                    <p className='path'>/product</p>
                                                                </>
                                                                <>
                                                                    <Link to='/product/category' className='modal-link'>Categories</Link>
                                                                    <p className='path'>/product/category</p>
                                                                </>
                                                                <>
                                                                    <Link to='/' className='modal-link'>Dashboard</Link>
                                                                    <p className='path'>/dashboard</p>
                                                                </>
                                                                <>
                                                                    <Link to='/user' className='modal-link'>User</Link>
                                                                    <p className='path'>/user</p>
                                                                </>
                                                            </>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="modal-backdrop fade show"
                                                    onClick={() => setShowModal(false)}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='d-lg-flex d-md-none d-none align-items-center gap-3 ms-auto'>
                                    <div className='icons1 d-flex m-0'></div>
                                    <div className="dropdown">
                                        <img src={ProfileImg} className='img-fluid' data-bs-toggle="dropdown" aria-expanded="false" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to={'/profile'} className='text-decoration-none'>
                                                    <a className="dropdown-item d-flex gap-2 align-items-center" href="#">
                                                        <img src={ProfileImg} className='img-fluid' />
                                                        <div>
                                                            <p className='m-0'>{name}</p>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </li>
                                            <hr className='m-1' />
                                            <li><a className="dropdown-item d-flex gap-2 align-items-center" href="#" onClick={() => navigate('/change-password')}><i className="fa-solid fa-rotate-left"></i>Change Password</a></li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="dropdown-item d-flex gap-2 align-items-center border-0 bg-transparent w-100 text-start"
                                                >
                                                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='d-block d-lg-none'>
                                    <p className='shoes-title'>ShoesX</p>
                                </div>
                                <div className='d-flex d-lg-none'>
                                    <div>
                                        <div className="search-sec">
                                            <button
                                                className="search-icon"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <i className="bi bi-search"></i>
                                            </button>
                                            {showModal && (
                                                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-modal="true" role="dialog">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <input type='text' className='modal-search-bar'></input>
                                                            </div>
                                                            <div className="modal-body text-start">
                                                                <>
                                                                    <p className='modal-title mb-3'>Quick Page Links</p>
                                                                    <>
                                                                        <Link to='/product' className='modal-link'>Product</Link>
                                                                        <p className='path'>/product</p>
                                                                    </>
                                                                    <>
                                                                        <Link to='/product/category' className='modal-link'>Categories</Link>
                                                                        <p className='path'>/product/category</p>
                                                                    </>
                                                                    <>
                                                                        <Link to='/dashboard' className='modal-link'>Dashboard</Link>
                                                                        <p className='path'>/dashboard</p>
                                                                    </>
                                                                    <>
                                                                        <Link to='/user' className='modal-link'>User</Link>
                                                                        <p className='path'>/user</p>
                                                                    </>
                                                                </>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="modal-backdrop fade show"
                                                        onClick={() => setShowModal(false)}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                        {showModal && (
                                            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-modal="true" role="dialog">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5">Modal title</h1>
                                                            <button
                                                                type="button"
                                                                className="btn-close"
                                                                onClick={() => setShowModal(false)}
                                                                aria-label="Close"
                                                            ></button>
                                                        </div>
                                                        <div className="modal-body">...</div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="modal-backdrop fade show"
                                                    onClick={() => setShowModal(false)}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='d-flex align-items-center gap-3'>
                                        <div class="dropdown">
                                            <img src={ProfileImg} className='img-fluid' data-bs-toggle="dropdown" aria-expanded="false" />
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <Link to={'/profile'} className='text-decoration-none'>
                                                        <a class="dropdown-item d-flex gap-2 align-items-center" href="#">
                                                            <img src={ProfileImg} className='img-fluid' />
                                                            <div>
                                                                <h6 className='m-0'>John Deo</h6>
                                                                <p className='m-0'>Admin</p>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <hr className='m-1' />
                                                <li><a class="dropdown-item d-flex gap-2 align-items-center" href="#"><i class="fa-solid fa-rotate-left"></i>Reset Password</a></li>
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="dropdown-item d-flex gap-2 align-items-center border-0 bg-transparent w-100 text-start"
                                                    >
                                                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className='content-wrapper'>
                            <Outlet context={{ closeSidebar }} />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}