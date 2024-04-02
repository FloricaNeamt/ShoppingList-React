// src/App.js
import React, { useState, useEffect} from 'react';
import ProductList from './ProductList';
import AuthPage from './AuthPage';
import  './App.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Assume some logic to set the isLoggedIn state upon successful login
    setIsLoggedIn(true);
  };

  useEffect(() => {
    // Verifică dacă există un token în localStorage la încărcarea componentei
    const loginToken = window.localStorage.getItem('loginToken');
    console.log(loginToken);
    if (loginToken) {
      // Dacă există, autentifică utilizatorul și actualizează starea părintelui
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <div>
            <ProductList />
          </div>
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </header>
    </div>
  );
}

export default App;
