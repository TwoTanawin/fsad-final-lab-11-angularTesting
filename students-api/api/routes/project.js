const express = require('express');
const router = express.Router();
const projectService = require("../services/project.service")

router.post('', projectService.createProject)
router.get('/:id', projectService.getProject)
router.get('', projectService.getProjects)
router.put('/:id', projectService.updateProject)
router.delete('/:id', projectService.deleteProject)

module.exports = router;
