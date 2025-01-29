// messageController.js
const Message = require('../models/Message');

// Send message
exports.sendMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;
  try {
    const message = new Message({ senderId, recipientId, content });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

// Get messages
exports.getMessages = async (req, res) => {
  const { recipientId } = req.params;
  try {
    const messages = await Message.find({ recipientId });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
