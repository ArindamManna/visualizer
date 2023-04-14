import React, { useState } from 'react'

function MenuItem({ data }) {
    const { label, subMenu, onclick } = data;
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className='menuItem' onClick={() => {
                if (onclick) {
                    onclick()
                }
                if (subMenu) {
                    setIsOpen(!isOpen)
                }
            }}>
                <span>
                    {label}
                </span>
                {subMenu &&
                    <span className={`transition-all duration-300 ${isOpen ? "-rotate-180" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                }
            </div>
            {subMenu &&
                <div className={`overflow-hidden max-h-0 transition-all duration-300 ${isOpen ? "max-h-96" : ''} `}>
                    {subMenu.map((item, i) => {
                        return <MenuItem data={item} key={i} />
                    })}
                </div>
            }
        </>
    )
}

export default MenuItem