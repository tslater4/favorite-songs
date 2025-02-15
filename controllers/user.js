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

        // Pass the logged-in user's ID and username to the view
        const loggedInUserId = req.session.user.id;
        const loggedInUsername = req.session.user.username;

        res.render('user/home.ejs', { user, loggedInUserId, loggedInUsername });
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});
router.get('/:id/songs/new', async (req, res) => {
    const userId = req.params.id;
    res.render('song/new.ejs', { userId });
}); 

router.get('/:id/songs/:songId', async (req, res) => {
    console.log("attempting to open individual song")
    const userId = req.params.id;
    const songId = req.params.songId;
    const user = await User.findById(userId);
    const song = user.favorites.id(songId);
    res.render('song/show.ejs', { userId, song });
});

router.get('/:id/songs/:songId/edit', async (req, res) => {
    const userId = req.params.id;
    const songId = req.params.songId;

    const user = await User.findById(userId);
    const song = user.favorites.id(songId);

    res.render('song/edit.ejs', { userId, song });
});

router.post('/:id/songs', async (req, res) => {
    const userId = req.params.id;
    const name = req.body.name;
    const artist = req.body.artist;
    
    const user = await User.findById(userId);
    user.favorites.push({ name, artist });
    
    await user.save();
    
    res.redirect(`/users/${userId}`);
});
router.put('/:id/songs/:songId', async (req, res) => {
    const userId = req.params.id;
    const songId = req.params.songId;
    const newName = req.body.name;
    const newArtist = req.body.artist;
  
    const user = await User.findById(userId);
    const song = user.favorites.id(songId);
  
    song.name = newName
    song.artist = newArtist;
  
    await user.save();
  
    res.redirect(`/users/${userId}/songs/${songId}`);
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
