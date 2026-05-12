import React, { useEffect, useState } from 'react'
import { getSkills } from './services/skillService'
import './skill.scss'

const SkillFilter = ({ selectedSkillId, onSkillChange }) => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getSkills()
        setSkills(data)
      } catch (err) {
        setError('Greška pri učitavanju veština.')
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return (
    <div className="skill-filter">
      <label>Filter po veštini:</label>

      {loading && <p>Učitavanje veština...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <select
          value={selectedSkillId}
          onChange={(event) => onSkillChange(event.target.value)}
        >
          <option value="">Sve veštine</option>

          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default SkillFilter