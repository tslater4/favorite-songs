const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Handle both logged-in and guest users
        let loggedInUserId = null;
        let loggedInUsername = null;
        
        if (req.session.user) {
            loggedInUserId = req.session.user.id;
            loggedInUsername = req.session.user.username;
        }

        res.render('user/home.ejs', { user, loggedInUserId, loggedInUsername });
    } catch (error) {
        res.redirect('/error');
    }
});
router.get('/:id/songs/new', async (req, res) => {
    const userId = req.params.id;
    const error = req.query.error;
    res.render('song/new.ejs', { userId, error });
}); 

router.get('/:id/songs/:songId', async (req, res) => {
    const userId = req.params.id;
    const songId = req.params.songId;
    const user = await User.findById(userId);
    const song = user.favorites.id(songId);
    res.render('song/show.ejs', { userId, song });
});

router.get('/:id/songs/:songId/edit', async (req, res) => {
    const userId = req.params.id;
    const songId = req.params.songId;
    const error = req.query.error;

    const user = await User.findById(userId);
    const song = user.favorites.id(songId);

    res.render('song/edit.ejs', { userId, song, error });
});

router.post('/:id/songs', async (req, res) => {
    try {
        const userId = req.params.id;
        const name = req.body.name;
        const artist = req.body.artist;
        const url = req.body.url;
        
        const user = await User.findById(userId);
        user.favorites.push({ name, artist, url });
        
        await user.save();
        
        res.redirect(`/users/${userId}`);
    } catch (error) {
        console.error('Error adding song:', error);
        if (error.name === 'ValidationError') {
            // Redirect back to the form with error message
            const userId = req.params.id;
            return res.redirect(`/users/${userId}/songs/new?error=Invalid URL. Please use a link from YouTube, Spotify, SoundCloud, Bandcamp, Apple Music, Tidal, or Deezer.`);
        }
        res.redirect('/error');
    }
});
router.put('/:id/songs/:songId', async (req, res) => {
    try {
        const userId = req.params.id;
        const songId = req.params.songId;
        const newName = req.body.name;
        const newArtist = req.body.artist;
        const newUrl = req.body.url;
      
        const user = await User.findById(userId);
        const song = user.favorites.id(songId);
      
        song.name = newName;
        song.artist = newArtist;
        song.url = newUrl;
      
        await user.save();
      
        res.redirect(`/users/${userId}/songs/${songId}`);
    } catch (error) {
        console.error('Error updating song:', error);
        if (error.name === 'ValidationError') {
            // Redirect back to the edit form with error message
            const userId = req.params.id;
            const songId = req.params.songId;
            return res.redirect(`/users/${userId}/songs/${songId}/edit?error=Invalid URL. Please use a link from YouTube, Spotify, SoundCloud, Bandcamp, Apple Music, Tidal, or Deezer.`);
        }
        res.redirect('/error');
    }
})

router.delete('/:id/songs/:songId', async (req, res) => {
    const userId =  req.params.id;
    const songId = req.params.songId;

    const user = await User.findById(userId);
    user.favorites.pull({_id: songId});
    
    await user.save();
    res.redirect(`/users/${userId}`);
});

module.exports = router;
