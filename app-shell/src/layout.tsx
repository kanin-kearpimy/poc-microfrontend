import { ComponentsState, Menu, useActions, SetRoute } from 'piral'
import { Redirect, Link } from 'react-router-dom';
import * as React from 'react'
import { getAuth } from './utils'
  
const SimpleWrapper = ({ children }) => {
    const [username, setUsername] = React.useState("");
    const user = getAuth();
    const { setUser } = useActions()

    if(!user) {
        return(
        <div id="login-dialog">
            <div>Please login.</div>
            <input type="text" name="username" value={username} onChange={ event => setUsername(event.target.value) }  />
            <button onClick={() => setUser(username)}>Login</button>
        </div>
        )
    }else{
        return(
        <>
            <SetRoute path="/" component={() => <Redirect from="/" to="/products" />} />
            {children}
        </>
        )
    }
}

export const layout: Partial<ComponentsState> = {
    ErrorInfo: props => (
        <div>
          <h1>Error</h1>
        </div>
      ),
    Layout: ({ children }) => {
        return(
            <SimpleWrapper>
                <Menu type="general" />
                    { children }
            </SimpleWrapper>
        )
    },
    MenuContainer: ({ children }) => {
        const [username, setUsername] = React.useState("");
        const { setUser, getUser } = useActions()
        const user = getUser()
        
        return (
            <header>
                <nav id="nav-menu" className="navbar navbar-light navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                    <div id="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/yellow">Shared component (extension)</Link></li>
                        <li><Link to="/state">State Management</Link></li>
                    </div>
                    <div>
                        <h3>Welcome: { user['username'] }</h3>
                        <label htmlFor="username">
                            Chnage your name: 
                            <input type="text" id="username" name="username" value={username} onChange={ event => setUsername(event.target.value) } />
                        </label>
                        <button onClick={() => setUser(username)}>Change!!</button>
                    </div>
                </nav>
            </header>
        )
    }
}