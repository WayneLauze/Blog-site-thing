import { createContext, useState } from 'react';


// create a context object
// this can be imported by other components

// the context provider is defined in App.js

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
