import axiosConfig from '../../../core/axiosConfig'

export const getSkills = async () => {
  const response = await axiosConfig.get('/skills')
  return response.data
}

export const addSkillToProject = async (projectId, dto) => {
  const response = await axiosConfig.post(
    `/skills/add-skill-to-project/${projectId}`,
    dto,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data
}