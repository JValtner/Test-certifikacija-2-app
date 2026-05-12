import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getSkills, addSkillToProject } from './services/skillService'
import '../projects/projects.scss'
import './skill.scss'

const AddProjectSkillModal = ({ project, onClose, onSaved }) => {
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            skillId: '',
            description: ''
        }
    })

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

    const handleClose = () => {
        reset()
        onClose()
    }

    const onSubmit = async (data) => {
        setSaving(true)
        setError('')

        const dto = {
            skillId: Number(data.skillId),
            description: data.description.trim()
        }

        try {
            await addSkillToProject(project.id, dto)

            reset({
                skillId: '',
                description: ''
            })

            if (onSaved) {
                await onSaved()
            }
        } catch (err) {
            setError('Greška pri dodavanju veštine na projekat.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="skill-modal">
                <div className="skill-modal-header">
                    <h3>Dodaj veštinu</h3>

                    <button
                        type="button"
                        className="modal-close-button"
                        onClick={handleClose}
                        disabled={saving}
                    >
                        ×
                    </button>
                </div>

                <p className="skill-modal-project-name">
                    Projekat: {project.name}
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Veština:</label>

                        <select
                            disabled={loading || saving}
                            {...register('skillId', {
                                required: 'Morate izabrati veštinu.'
                            })}
                        >
                            <option value="">
                                {loading ? 'Učitavanje veština...' : 'Izaberite veštinu'}
                            </option>

                            {skills.map((skill) => (
                                <option key={skill.id} value={skill.id}>
                                    {skill.name}
                                </option>
                            ))}
                        </select>

                        {errors.skillId && (
                            <span className="error-message">
                                {errors.skillId.message}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Opis:</label>

                        <textarea
                            placeholder="Unesite opis veštine na projektu"
                            rows={4}
                            disabled={saving}
                            {...register('description', {
                                required: 'Opis je obavezan.',
                                validate: (value) =>
                                    value.trim().length > 0 || 'Opis je obavezan.'
                            })}
                        />

                        {errors.description && (
                            <span className="error-message">
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    <div className="form-actions-row">
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={saving || loading}
                        >
                            {saving ? 'Čuvanje...' : 'Sačuvaj'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                            disabled={saving}
                        >
                            Otkaži
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProjectSkillModal