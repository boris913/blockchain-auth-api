document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const verifyButton = document.getElementById('verify-button');
    const verifyResult = document.getElementById('verify-result');
    let jwtToken = '';
  
    // Handle registration
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('register-email').value;
  
      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
  
        const data = await response.json();
        alert('Registration successful! Public Key: ' + data.publicKey);
      } catch (error) {
        console.error('Error:', error);
        alert('Registration failed: ' + error.message);
      }
    });
  
    // Handle login
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const publicKey = document.getElementById('login-publicKey').value;
      const signature = document.getElementById('login-signature').value;
  
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ publicKey, signature })
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
  
        const data = await response.json();
        jwtToken = data.token;
        alert('Login successful! JWT Token: ' + jwtToken);
      } catch (error) {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
      }
    });
  
    // Handle identity verification
    verifyButton.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + jwtToken
          }
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
  
        const data = await response.json();
        verifyResult.textContent = 'Identity Verified! Public Key: ' + data.publicKey;
      } catch (error) {
        console.error('Error:', error);
        verifyResult.textContent = 'Verification failed: ' + error.message;
      }
    });
  });