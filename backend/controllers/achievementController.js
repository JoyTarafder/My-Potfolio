import Achievement from '../models/Achievement.js';

// GET /api/achievements
export const getAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: achievements.length, data: achievements });
  } catch (error) {
    next(error);
  }
};

// POST /api/achievements
export const createAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    next(error);
  }
};

// PUT /api/achievements/:id
export const updateAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
    res.json({ success: true, data: achievement });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/achievements/:id
export const deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
