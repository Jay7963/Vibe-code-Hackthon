import React, { useState } from 'react'
import './App.css'
import SkillCard from './components/SkillCard'
import GradientBlinds from './components/GradientBlinds'
import { getSkillInfo } from './utils/skillDatabase'

function App() {
  const [skill, setSkill] = useState('')
  const [skillData, setSkillData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!skill.trim()) return

    setIsLoading(true)
    
    // Simulate AI processing delay
    setTimeout(() => {
      const data = getSkillInfo(skill)
      setSkillData(data)
      setIsLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setSkill('')
    setSkillData(null)
  }

  return (
    <div className="App">
      {/* Interactive Gradient Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>
      
      <header className="app-header">
        <div className="sdg-badge">
          <span className="sdg-icon">🎯</span>
          <span>SDG 4 & 8</span>
        </div>
        <h1>AI Career Tutor</h1>
        <p className="subtitle">
          Learn new skills and discover job opportunities aligned with 
          <strong> Quality Education</strong> and <strong>Decent Work</strong>
        </p>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="skill-form">
          <div className="input-group">
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Enter a skill you want to learn (e.g., Python Programming, Digital Marketing, Web Design)"
              className="skill-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="search-btn"
              disabled={isLoading || !skill.trim()}
            >
              {isLoading ? '🔍 Analyzing...' : '🚀 Get Learning Path'}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>AI is analyzing your skill and creating a personalized learning path...</p>
          </div>
        )}

        {skillData && !isLoading && (
          <div className="results-container">
            <div className="results-header">
              <h2>Your Learning Journey for: <span className="skill-highlight">{skillData.skillName}</span></h2>
              <button onClick={handleReset} className="reset-btn">Try Another Skill</button>
            </div>
            
            <div className="cards-container">
              <SkillCard
                title="📚 Skill Overview"
                content={skillData.overview}
                type="overview"
              />
              
              <SkillCard
                title="🛤️ Learning Path (3 Steps)"
                content={skillData.learningPath}
                type="learning"
              />
              
              <SkillCard
                title="💰 Monetization Opportunities"
                content={skillData.monetization}
                type="monetization"
              />
            </div>
          </div>
        )}

        {!skillData && !isLoading && (
          <div className="example-section">
            <h3>🌟 Try these popular skills:</h3>
            <div className="example-skills">
              {['Python Programming', 'Digital Marketing', 'Graphic Design', 'Data Analysis', 'Content Writing'].map((exampleSkill) => (
                <button
                  key={exampleSkill}
                  onClick={() => setSkill(exampleSkill)}
                  className="example-skill-btn"
                >
                  {exampleSkill}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>🌍 Supporting UN Sustainable Development Goals</p>
        <div className="sdg-info">
          <span><strong>SDG 4:</strong> Quality Education</span>
          <span><strong>SDG 8:</strong> Decent Work and Economic Growth</span>
        </div>
      </footer>
    </div>
  )
}

export default App