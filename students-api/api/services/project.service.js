const Project = require('../models/project');

const createProject = async (req, res) => {
    try {
        const { name, description, monthDuration } = req.body;

        const project = new Project({ name, description, monthDuration });
        
        const savedProject = await project.save();
        
        res.status(201).json({project: savedProject})
    } catch (error) {
        res.status(500).json({error: error.message })
    }
};


const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        
        res.status(201).json({ projects: projects })
    } catch (error) {
        res.status(500).json({error: error.message })
    }
};


const getProject = async (req, res) => {
    try {
        const id = req.params.id;

        const project = await Project.findById(id);
        
        if (!project) {
            throw new Error('Project not found');
        }
        
        res.status(201).json({project: project})
    } catch (error) {
        res.status(500).json({error: error.message })
    }
};


const updateProject = async (req, res) => {
    try {
        const id = req.params.id;

        const updatedProjectData = req.body   
        
        const updatedProject = await Project.findByIdAndUpdate(id, updatedProjectData, { new: true});

        if (!updatedProject) {
            throw new Error('Project not found');
        }
        res.status(201).json({project: updatedProject})
    } catch (error) {
        res.status(500).json({error: error.message })
    }
};

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id

        const deletedProject = await Project.findByIdAndDelete(id);
        
        if (!deletedProject) {
            throw new Error('Project not found');
        }
        
        res.status(201).json({message: "Project deleted successfully."})
    } catch (error) {
        res.status(500).json({error: error.message })
    }
};

module.exports = {
    createProject,
    getProject,
    getProjects,
    updateProject,
    deleteProject
};
