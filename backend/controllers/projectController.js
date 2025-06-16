import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  const { title, description, teamMembers } = req.body;
  const project = await Project.create({ title, description, teamMembers });
  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find().populate('teamMembers', 'name email');
  res.json(projects);
};
