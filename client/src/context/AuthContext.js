import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            console.log('Login response status:', response.status); // Debug log
            const responseBody = await response.text(); // Read response as text
            console.log('Login response body:', responseBody); // Debug log

            if (!response.ok) {
                const errorData = JSON.parse(responseBody || '{}'); // Parse response or fallback to empty object
                throw new Error(errorData.error || 'Login failed');
            }

            const data = JSON.parse(responseBody); // Parse JSON response
            setUser(data.user);
            setToken(data.token);
            return data;
        } catch (error) {
            console.error('Login error:', error); // Debug log
            throw error;
        }
    };

    const register = async (email, password) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            setUser(data.user);
            setToken(data.token);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const uploadToGitHub = async (fileContent, filePath, repo, branch, token) => {
        try {
            const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Upload ${filePath}`,
                    content: btoa(fileContent),
                    branch: branch,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to upload file to GitHub');
            }

            return await response.json();
        } catch (error) {
            console.error('GitHub upload error:', error);
            throw error;
        }
    };

    // Example usage of uploadToGitHub
    // uploadToGitHub(fileContent, 'path/in/repo/AuthContext.js', 'username/repo', 'main', 'your_github_token');

    const pushAllFilesToGitHub = async (files, repo, branch, token) => {
        try {
            for (const file of files) {
                const { content, path } = file;
                const url = `https://api.github.com/repos/${repo}/contents/${path}`;
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Upload ${path}`,
                        content: btoa(content),
                        branch: branch,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to upload ${path}: ${errorData.message}`);
                }
            }
            console.log('All files pushed to GitHub successfully.');
        } catch (error) {
            console.error('GitHub push error:', error);
            throw error;
        }
    };

    // Example usage of pushAllFilesToGitHub
    // const files = [
    //     { content: 'file content here', path: 'path/in/repo/file1.js' },
    //     { content: 'another file content', path: 'path/in/repo/file2.js' },
    // ];
    // pushAllFilesToGitHub(files, 'username/repo', 'main', 'your_github_token');

    const value = {
        user,
        token,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};