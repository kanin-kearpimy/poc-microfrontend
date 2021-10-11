import { ComponentsState, Menu } from 'piral'
import * as React from 'react'
import { Link } from 'react-router-dom'

export const layout: Partial<ComponentsState> = {
    DashboardContainer: ({ children }) => (
        <div>
            {children}
        </div>
    ),
    Layout: ({ children }) => (
        <div>
            
            <Menu type='general'></Menu>
            <div className='container'>{children}</div>
        </div>
    ),

    MenuContainer: ({ children }) => {
        return (
            <header>
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link to="/yellow">
                            Yello Page
                        </Link>
                        <Link to="/state">
                            State Page
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }
}