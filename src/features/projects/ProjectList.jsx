import React, { useState } from 'react'
import { startProject, lockProject, unLockProject } from './services/projectService'
import AddProjectSkillModal from '../skills/AddProjectSkillModal'
import './projects.scss'

const ProjectList = ({
  projects,
  onSelectProject,
  selectedProjectId,
  onProjectChanged
}) => {
  const [statusMsg, setStatusMsg] = useState('')
  const [skillModalProject, setSkillModalProject] = useState(null)

  const clearStatusMessage = () => {
    setTimeout(() => {
      setStatusMsg('')
    }, 3000)
  }

  const handleStartProject = async (projectId) => {
    setStatusMsg('')

    try {
      await startProject(projectId)
      setStatusMsg('Projekat je uspešno startovan.')

      if (onProjectChanged) {
        await onProjectChanged()
      }
    } catch (err) {
      setStatusMsg('Greška pri startovanju projekta.')
    } finally {
      clearStatusMessage()
    }
  }

  const handleLockProject = async (projectId) => {
    setStatusMsg('')

    try {
      await lockProject(projectId)
      setStatusMsg('Projekat je uspešno zaključan.')

      if (onProjectChanged) {
        await onProjectChanged()
      }
    } catch (err) {
      setStatusMsg('Greška pri zaključavanju projekta.')
    } finally {
      clearStatusMessage()
    }
  }

  const handleUnLockProject = async (projectId) => {
    setStatusMsg('')

    try {
      await unLockProject(projectId)
      setStatusMsg('Projekat je uspešno otključan.')

      if (onProjectChanged) {
        await onProjectChanged()
      }
    } catch (err) {
      setStatusMsg('Greška pri otključavanju projekta.')
    } finally {
      clearStatusMessage()
    }
  }

  const handleSkillSaved = async () => {
    setStatusMsg('Veština je uspešno dodata na projekat.')

    if (onProjectChanged) {
      await onProjectChanged()
    }

    clearStatusMessage()
  }

  return (
    <div className="project-list">
      {statusMsg && (
        <div className="project-status-message">
          {statusMsg}
        </div>
      )}

      {projects.map((project) => (
        <div
          key={project.id}
          className={selectedProjectId === project.id ? 'project-card selected' : 'project-card'}
        >
          <div className="project-card-header">
            <h3 className="project-name">{project.name}</h3>

            <div className="project-card-actions">
              {project.status === 0 && onSelectProject && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleStartProject(project.id)}
                >
                  Startuj projekat
                </button>
              )}

              {project.status === 1 && onSelectProject && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleLockProject(project.id)}
                >
                  Zaključaj projekat
                </button>
              )}

              {project.status === 2 && onSelectProject && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleUnLockProject(project.id)}
                >
                  Otključaj projekat
                </button>
              )}

              {onSelectProject && (
                <>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectProject(project.id)}
                  >
                    Izmeni
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => setSkillModalProject(project)}
                  >
                    Dodaj veštinu
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="project-description">{project.description}</p>
          <span className='skils-tag-view'>Veštine:
            <ul>
            {project.skills?.map((skill) => <li key={skill.id}>{skill.skillName}</li>)}
            </ul>
          </span>

          <div className="project-meta">
            <span className="project-status">
              Status: {project.status === 0
                ? 'U Pripremi'
                : project.status === 1
                  ? 'U Realizaciji'
                  : project.status === 2
                    ? 'Kompletiran'
                    : 'Arhiviran'}
            </span>

            <span>
              Započet: {new Date(project.startedAt).toLocaleDateString()}
            </span>

            {project.completedAt && (
              <span>
                Završen: {new Date(project.completedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))}

      {skillModalProject && (
        <AddProjectSkillModal
          project={skillModalProject}
          onClose={() => setSkillModalProject(null)}
          onSaved={handleSkillSaved}
        />
      )}
    </div>
  )
}

export default ProjectList