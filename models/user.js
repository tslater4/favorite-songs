const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                if (!v) return true; // URL is optional
                // Validate URL is from allowed music platforms
                const allowedDomains = [
                    'youtube.com', 'youtu.be', 'music.youtube.com',
                    'spotify.com', 'open.spotify.com',
                    'soundcloud.com',
                    'bandcamp.com',
                    'apple.com/music', 'music.apple.com',
                    'tidal.com',
                    'deezer.com'
                ];
                try {
                    const url = new URL(v);
                    return allowedDomains.some(domain => 
                        url.hostname === domain || 
                        url.hostname === 'www.' + domain ||
                        url.hostname.endsWith('.' + domain)
                    );
                } catch {
                    return false;
                }
            },
            message: 'URL must be from a supported music platform (YouTube, Spotify, SoundCloud, Bandcamp, Apple Music, Tidal, or Deezer)'
        }
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [songSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;