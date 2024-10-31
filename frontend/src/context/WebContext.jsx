import { createContext, useContext, useState, useEffect } from "react";

const webContext = createContext();

export function WebContextProvider({ children }) {

    const localTheme = localStorage.getItem('theme');
    

    const [theme, setTheme] = useState(localTheme || 'light');
    const [themeMenu, setThemeMenu] = useState('hidden');
    const [mode, setMode] = useState(localTheme || 'system');

    // For reference https://coolors.co/palette/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
    


    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function updateTheme(mode) {
        const html = document.getElementsByTagName('html')[0];
        if (mode === "system") {
            const darkThemeMq = darkModeMediaQuery.matches
            if (darkThemeMq) {
                html.classList.add('dark');
                setTheme("dark");
            } else {
                html.classList.remove('dark');
                setTheme("light");
            }
            localStorage.removeItem('theme');
            return 
        }
        else if (mode === "dark") {
            setTheme("dark");
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else if (mode === "light") {
            setTheme("light");
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    useEffect(() => {
        updateTheme(mode);
        if (mode === "system") {
            darkModeMediaQuery.addEventListener('change', () => {
                updateTheme('system');
            });
        }

        return () => {
            if (mode === "system") {
                darkModeMediaQuery.removeEventListener('change',()=>{})
            }    
        }
    }, [mode]);

    return (
        <webContext.Provider value={{ theme}}>
            <div className={`dark:text-darkText text-lightText`}>
                <button
                    className="fixed -left-14 hover:left-0 duration-75 bottom-10 dark:bg-[#4A628A] bg-[#023E8A] w-24 rounded-r-full flex gap-1 dark:text-[#DFF2EB] text-white delay-200 z-30 ring ring-[#9290C3] "
                    onClick={()=>{setThemeMenu('block')}} 
                    onMouseLeave={() => {setThemeMenu('hidden')}}
                >
                    <div className="my-auto font-bold">Theme</div>                    
                    <img src="/mode.png" alt="theme" className="w-10 h-10"/>
                    <div className={`absolute bottom-10 left-1 dark:bg-[#4A628A] bg-[#023E8A] font-semibold p-1 rounded-xl ${themeMenu} w-20  border-x-2 border-t-2 border-[#9290C3]`}
                    // onMouseLeave={() => {setThemeMenu('hidden')}}
                    >
                        <ul className="flex gap-2 flex-col">
                            <li onClick={(e) => {
                                e.stopPropagation(); setMode("system"); setThemeMenu('hidden');
                            }} className="hover:bg-[#4A628A] dark:hover:bg-[#000000] p-1 rounded-xl">System</li>
                            <li onClick={(e) => {
                                e.stopPropagation(); setMode("dark"); setThemeMenu('hidden');
                            }} className="hover:bg-[#4A628A] dark:hover:bg-[#000000] p-1 rounded-xl">Dark</li>
                            <li onClick={(e) => {
                                e.stopPropagation(); setMode("light"); setThemeMenu('hidden');
                            }} className="hover:bg-[#4A628A] dark:hover:bg-[#000000] p-1 rounded-xl">Light</li>
                        </ul>
                    </div>
                </button>
                {children}
            </div>
        </webContext.Provider>
    )
}

export default function useWeb() {
    return useContext(webContext);
}   