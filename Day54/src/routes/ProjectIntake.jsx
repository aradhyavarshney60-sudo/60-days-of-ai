import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const TIME_OPTIONS = ['1-2 hrs/day', '3-4 hrs/day', '5+ hrs/day']

export default function ProjectIntake() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [ideaText, setIdeaText] = useState('')
  const [skillLevel, setSkillLevel] = useState('')
  const [timeAvailable, setTimeAvailable] = useState('')
  const [preferences, setPreferences] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function goNext() {
    setError('')
    if (step === 1 && !ideaText.trim()) { setError('Please describe what you want to build.'); return }
    if (step === 2 && !skillLevel) { setError('Please select your skill level.'); return }
    if (step === 3 && !timeAvailable) { setError('Please select how much time you have available.'); return }
    setStep(step + 1)
  }

  function goBack() { setError(''); setStep(step - 1) }

  async function handleSubmit() {
    setError(''); setSubmitting(true)
    const { error: insertError } = await supabase.from('projects').insert({
      user_id: user.id,
      idea_text: ideaText.trim(),
      skill_level: skillLevel,
      time_available: timeAvailable,
      preferences: preferences.trim() || null,
    })
    setSubmitting(false)
    if (insertError) { setError('Something went wrong: ' + insertError.message); return }
    navigate('/generating')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />)}
        </div>
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you want to build?</h2>
            <textarea value={ideaText} onChange={(e) => setIdeaText(e.target.value)} rows={5} placeholder="e.g. Habit tracker" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Skill level</h2>
            <div className="space-y-2">{SKILL_LEVELS.map((level) => <button key={level} onClick={() => setSkillLevel(level)} className={`w-full text-left px-4 py-3 rounded border ${skillLevel === level ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>{level}</button>)}</div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Time available</h2>
            <div className="space-y-2">{TIME_OPTIONS.map((option) => <button key={option} onClick={() => setTimeAvailable(option)} className={`w-full text-left px-4 py-3 rounded border ${timeAvailable === option ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>{option}</button>)}</div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferences</h2>
            <textarea value={preferences} onChange={(e) => setPreferences(e.target.value)} rows={4} placeholder="Optional" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        )}
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <div className="flex justify-between mt-6">
          {step > 1 ? <button onClick={goBack} className="px-4 py-2">Back</button> : <span />}
          {step < 4 ? <button onClick={goNext} className="bg-blue-600 text-white px-6 py-2 rounded">Next</button> : <button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded">{submitting ? 'Saving...' : 'Generate My Plan'}</button>}
        </div>
      </div>
    </div>
  )
}