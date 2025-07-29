import express from 'express';
import { body, validationResult } from 'express-validator';
import Session from '../models/Session.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// GET /sessions - View all public sessions (no auth required)
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' })
      .populate('user_id', 'email')
      .sort({ updated_at: -1 })
      .limit(50);

    res.json({
      message: 'Public sessions retrieved successfully',
      sessions: sessions.map(session => ({
        id: session._id,
        title: session.title,
        tags: session.tags,
        json_file_url: session.json_file_url,
        status: session.status,
        author: session.user_id.email,
        created_at: session.created_at,
        updated_at: session.updated_at
      }))
    });
  } catch (error) {
    console.error('Error fetching public sessions:', error);
    res.status(500).json({ message: 'Failed to fetch public sessions' });
  }
});

// GET /my-sessions - Get logged-in user's sessions (auth required)
router.get('/my-sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.userId })
      .sort({ updated_at: -1 });

    res.json({
      message: 'User sessions retrieved successfully',
      sessions: sessions.map(session => ({
        id: session._id,
        title: session.title,
        tags: session.tags,
        json_file_url: session.json_file_url,
        status: session.status,
        created_at: session.created_at,
        updated_at: session.updated_at
      }))
    });
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    res.status(500).json({ message: 'Failed to fetch user sessions' });
  }
});

// GET /my-sessions/:id - Get specific session (auth required)
router.get('/my-sessions/:id', authenticateToken, async (req, res) => {
  try {
    const session = await Session.findOne({ 
      _id: req.params.id, 
      user_id: req.user.userId 
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({
      message: 'Session retrieved successfully',
      session: {
        id: session._id,
        title: session.title,
        tags: session.tags,
        json_file_url: session.json_file_url,
        status: session.status,
        created_at: session.created_at,
        updated_at: session.updated_at
      }
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Failed to fetch session' });
  }
});

// POST /my-sessions/save-draft - Create or update draft session (auth required)
router.post('/my-sessions/save-draft', [
  authenticateToken,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('json_file_url').trim().notEmpty().withMessage('JSON file URL is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, tags = [], json_file_url, sessionId } = req.body;

    let session;

    if (sessionId) {
      // Update existing session
      session = await Session.findOne({ 
        _id: sessionId, 
        user_id: req.user.userId 
      });

      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }

      session.title = title;
      session.tags = tags;
      session.json_file_url = json_file_url;
      session.status = 'draft';
      await session.save();
    } else {
      // Create new session
      session = new Session({
        user_id: req.user.userId,
        title,
        tags,
        json_file_url,
        status: 'draft'
      });
      await session.save();
    }

    res.json({
      message: sessionId ? 'Draft updated successfully' : 'Draft saved successfully',
      session: {
        id: session._id,
        title: session.title,
        tags: session.tags,
        json_file_url: session.json_file_url,
        status: session.status,
        created_at: session.created_at,
        updated_at: session.updated_at
      }
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Failed to save draft' });
  }
});

// POST /my-sessions/publish - Publish a session (auth required)
router.post('/my-sessions/publish', [
  authenticateToken,
  body('sessionId').notEmpty().withMessage('Session ID is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { sessionId } = req.body;

    const session = await Session.findOne({ 
      _id: sessionId, 
      user_id: req.user.userId 
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.status = 'published';
    await session.save();

    res.json({
      message: 'Session published successfully',
      session: {
        id: session._id,
        title: session.title,
        tags: session.tags,
        json_file_url: session.json_file_url,
        status: session.status,
        created_at: session.created_at,
        updated_at: session.updated_at
      }
    });
  } catch (error) {
    console.error('Error publishing session:', error);
    res.status(500).json({ message: 'Failed to publish session' });
  }
});

export default router;
