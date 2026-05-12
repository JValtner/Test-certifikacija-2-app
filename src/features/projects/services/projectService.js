import axiosConfig from '../../../core/axiosConfig';

export const getProjectsByUser = async (userId) => {
  const response = await axiosConfig.get(`/projects/users/${userId}`);
  return response.data;
};

export const getMyProjects = async () => {
  const response = await axiosConfig.get('/projects/mine');
  return response.data;
};

export const getActiveProjects = async(userId) => {
  const response = await axiosConfig.get(`/projects/active/${userId}`);
  return response.data;
};

export const getCompletedProjectsByUserAndSkill = async (userId, skillId) => {
  const response = await axiosConfig.get(
    `/projects/users/${userId}/completed-by-skill/${skillId}`
  )

  return response.data
}

export const createProject = async (dto) => {
  const response = await axiosConfig.post('/projects', dto);
  return response.data;
};

export const updateProject = async (id, dto) => {
  const response = await axiosConfig.put(`/projects/${id}`, dto);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axiosConfig.delete(`/projects/${id}`);
  return response.data;
};

export const startProject = async (projectId) => {
  const response = await axiosConfig.post(`/projects/${projectId}/start`);
  return response.data;
};

export const lockProject = async (projectId) => {
  const response = await axiosConfig.post(`/projects/${projectId}/lock`);
  return response.data;
};

export const unLockProject = async (projectId) => {
  const response = await axiosConfig.post(`/projects/${projectId}/unlock`);
  return response.data;
};