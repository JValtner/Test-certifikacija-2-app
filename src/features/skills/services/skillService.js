import axiosConfig from '../../../core/axiosConfig';

export const getSkills = async () => {
  const response = await axiosConfig.get('/skills')
  return response.data
}
