import Skill from '../models/Skill.js';

// GET /api/skills
export const getSkills = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const skills = await Skill.find(filter).sort({ category: 1, name: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

// POST /api/skills
export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/skills/:id
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
};
