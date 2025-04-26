# Notes App

A full-stack MERN application for creating and managing notes with user authentication.

## Features

- User authentication (register/login)
- Create, read, update, and delete notes
- Secure password storage
- JWT-based authentication
- Responsive design

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Deployment: Vercel

## Local Development Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd notes-app
```

2. Set up the backend
```bash
cd server
npm install
```

3. Create a .env file in the server directory with:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

4. Set up the frontend
```bash
cd ../client
npm install
```

5. Start the development servers
```bash
# Terminal 1 (Backend)
cd server
npm run dev

# Terminal 2 (Frontend)
cd client
npm start
```

## Environment Variables

### Server (.env)
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `FRONTEND_URL`: Your frontend URL in production

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the following environment variables in Vercel:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL` (your Vercel frontend URL)

4. Deploy!

## Security Notes

- Never commit your .env files
- Use strong JWT secrets
- Keep your MongoDB credentials secure
- Use HTTPS in production

## 🔗 Live Demo
[View Live Demo](https://your-vercel-url.vercel.app)

## License

MIT
