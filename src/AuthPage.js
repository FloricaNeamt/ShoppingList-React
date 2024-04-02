// src/AuthPage.js
import React, { useState } from 'react';

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Adăugăm starea pentru email
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:8080/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      window.localStorage.setItem("loginToken",result.token);
      if (response.ok) {
        // alert(result); // Afișează un mesaj de succes
        onLogin(); // Apelează funcția de apel înapoi pentru a actualiza starea părintelui
      } else {
        alert(result.message); // Afișează un mesaj de eroare
      }
    } catch (error) {
      console.error('Eroare în timpul autentificării:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), // Adăugăm și email în cerere
      });

      const result = await response.json();

      if (response.ok) {
        window.localStorage.setItem('loginToken', result.token);
        onLogin();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Eroare în timpul creării utilizatorului:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      isSignUp ? handleSignUp() : handleSignIn();
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Creare Utilizator' : 'Autentificare'}</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {/* Adăugăm câmpul pentru email */}
        {isSignUp && (
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        )}
        <br />
        <button type="button" onClick={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp ? 'Creare Utilizator' : 'Autentificare'}
        </button>
      </form>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Autentificare' : 'Creare Cont'}
      </button>
    </div>
  );
};

export default AuthPage;
