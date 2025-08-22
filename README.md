# Favorite Songs Collection

A personalized music collection app where users can save, organize, and share their favorite songs with links to streaming platforms.
Timeframe: 5 days for functionality, CSS done afterwards in 1 day. 

## Features

- **User Authentication**: Secure sign-up and sign-in functionality with bcrypt password hashing
- **Song Management**: Add, edit, and delete songs in your personal collection
- **Public Profile Viewing**: Browse user profiles and music collections without needing to log in
- **Modern UI**: Clean, responsive design with gradient themes and smooth animations
- **Profile Sharing**: Share your music collection with friends through public profile links

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcrypt for password hashing, Express sessions
- **Frontend**: EJS templating, vanilla JavaScript
- **Styling**: CSS3 with custom properties and modern design system
- **Deployment**: Render (cloud hosting)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd favorite-songs-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret_key
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Visit the app**
   Open `http://localhost:3000` in your browser

## 📁 Project Structure

```
├── controllers/
│   ├── auth.js          # Authentication logic
│   └── user.js          # User and song CRUD operations
├── middlewear/
│   └── is-signed-in.js  # Authentication middleware
├── models/
│   └── user.js          # User and Song schemas
├── public/
│   └── css/
│       ├── auth.css     # Authentication page styles
│       └── styles.css   # Main application styles
├── views/
│   ├── auth/            # Sign-in/sign-up templates
│   ├── song/            # Song management templates
│   ├── user/            # User profile templates
│   └── index.ejs        # Landing page
├── server.js            # Main application entry point
└── package.json         # Dependencies and scripts
```

## Usage

1. **Browse Collections**: Visit user profiles and browse music collections without signing up
2. **Create Account**: Sign up with username and password to create your own collection
3. **Add Songs**: Click "Add New Song" to add songs with artist, title, and streaming link
4. **Manage Collection**: Edit or delete songs from your personal collection
5. **Share Profile**: Share your public profile URL with friends
6. **Discover Music**: Visit other users' profiles to discover new songs

## Platform Support

The app validates and supports links from these trusted music platforms:
- YouTube & YouTube Music
- Spotify
- SoundCloud
- Bandcamp
- Apple Music
- Tidal
- Deezer

## Live Demo

Visit the deployed application: [https://favorite-songs-0kjc.onrender.com](https://favorite-songs-0kjc.onrender.com)

## Planning & Development

Project planning board: [Trello](https://trello.com/b/CgnN49o1/module-2-project-planning)
