// Import required libraries
const baileys = require('@adiwajshing/baileys');
const scraper = require('scraper');

// Create a new instance of WhatsApp bot
const bot = new baileys.WAConnection();

// Connect to WhatsApp server
bot.connect();

// Event listener for incoming messages
bot.on('chat-update', async (chat) => {
  // Check if the message is from a group or individual chat
  if (chat.jid.includes('@g.us')) {
    // Message is from a group chat
    const message = chat.messages.all()[0];
    const groupJid = message.key.remoteJID;
    const senderJid = message.participant;
    const text = message.message.conversation;

    // Check if the message contains a command to play music
    if (text.startsWith('.play')) {
      // Extract the song name from the command
      const songName = text.substring(6).trim();

      // Use the scraper library to search for the song on a music website
      const searchResults = await scraper.search(songName);

      // Get the first search result
      const firstResult = searchResults[0];

      // Send a message to the group chat with the song details and a link to play the song
      const songDetails = `Title: ${firstResult.title}\nArtist: ${firstResult.artist}\nDuration: ${firstResult.duration}`;
      const songLink = firstResult.link;
      bot.sendMessage(groupJid, `${songDetails}\n\n${songLink}`);
    }
  } else {
    // Message is from an individual chat
    // Handle individual chat messages here
  }
});
