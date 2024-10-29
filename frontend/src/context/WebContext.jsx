import { createContext, useContext, useState, useEffect } from "react";

const webContext = createContext();

export function WebContextProvider({ children }) {

    const [theme, setTheme] = useState("system");
    const [themeMenu, setThemeMenu] = useState('hidden');
    
    const lightText = '#000000'
    const darkText = '#DFF2EB'

    const lightButton = '#4A628A'
    const darkButton = '#4A628A'

    const lightBg = '#DFF2EB'
    const darkBg = '#070F2B'

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function updateTheme(theme) {
        const html = document.getElementsByTagName('html')[0];
        if (theme === "system") {
            const darkThemeMq = darkModeMediaQuery.matches
            if (darkThemeMq) {
                html.classList.add('dark');
                setTheme("dark");
            } else {
                html.classList.remove('dark');
                setTheme("light");
            }
        }
        else if (theme === "dark") {
            html.classList.add('dark');
        } else if (theme === "light") {
            html.classList.remove('dark');
        }
    }

    useEffect(() => {
        updateTheme(theme);
        if (theme === "system") {
            darkModeMediaQuery.addEventListener('change', () => {
                updateTheme('system');
            });
        }

        return () => {
            if (theme === "system") {
                darkModeMediaQuery.removeEventListener('change',()=>{})
            }    
        }
    }, [theme]);

    return (
        <webContext.Provider value={{ theme, lightText, darkText, lightButton, darkButton, lightBg, darkBg,}}>
            <div className="dark:text-[#DFF2EB] text-black">
                <button
                    className="fixed -left-14 hover:left-0 duration-75 bottom-10 dark:bg-[#4A628A] bg-[#9290C3] w-24 rounded-r-full flex gap-1 dark:text-[#DFF2EB] text-white delay-200 z-30 ring ring-[#9290C3] "
                    onClick={()=>{setThemeMenu('block')}} 
                >
                    <div className="my-auto font-bold">Theme</div>                    
                    <img src="mode.png" alt="theme" className="w-10 h-10"/>
                    <div className={`absolute bottom-11 left-0 dark:bg-[#4A628A] bg-[#9290C3] font-semibold p-1 rounded-xl ${themeMenu} w-20 ring ring-[#9290C3] `}
                    onMouseLeave={() => {setThemeMenu('hidden')}}
                    >
                        <ul className="flex gap-2 flex-col">
                            <li onClick={(e) => {
                                e.stopPropagation();setTheme("system"); setThemeMenu('hidden');
                            }} className="hover:bg-[#4A628A] dark:hover:bg-[#000000] p-1 rounded-xl">System</li>
                            <li onClick={(e) => {
                                e.stopPropagation(); setTheme("dark"); setThemeMenu('hidden');
                            }} className="hover:bg-[#4A628A] dark:hover:bg-[#000000] p-1 rounded-xl">Dark</li>
                            <li onClick={(e) => {
                                e.stopPropagation(); setTheme("light"); setThemeMenu('hidden');
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