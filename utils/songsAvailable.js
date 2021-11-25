const publicBeat = require('../models/publicBeatModel');
const customBeat = require('../models/customBeatModel');

exports.songsAvailable = async (req, res, next) => {
  const availableSongs = [];
  const cart = req.session.cart;
  const publicSongs = cart
    .filter(song => song.category === 'public')
    .map(song => song._id);

  const orderedSongs = cart
    .filter(song => song.category === 'custom')
    .map(song => song._id);

  if (publicSongs.length !== 0 && orderedSongs.length !== 0) {
    const foundPublicSongs = (
      await publicBeat.find({ _id: { $in: [...publicSongs] } }, '-song')
    ).filter(song => song);

    const foundOrderedSongs = (
      await publicBeat.find({ _id: { $in: [...orderedSongs] } }, '-song')
    ).filter(song => song);

    availableSongs.push(...foundPublicSongs);
    availableSongs.push(...foundOrderedSongs);

    req.session.cart = [...availableSongs];
  }

  if (publicSongs.length !== 0 && orderedSongs.length === 0) {
    const foundPublicSongs = (
      await publicBeat.find({ _id: { $in: [...publicSongs] } }, '-song')
    ).filter(song => song);

    availableSongs.push(...foundPublicSongs);

    req.session.cart = [...availableSongs];
  }

  if (publicSongs.length === 0 && orderedSongs.length !== 0) {
    const foundOrderedSongs = (
      await customBeat.find({ _id: { $in: [...orderedSongs] } }, '-song')
    ).filter(song => song);

    req.session.cart = [...availableSongs];
  }

  next();
};
