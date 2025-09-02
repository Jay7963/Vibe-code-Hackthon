import React from 'react'
import './SkillCard.css'

const SkillCard = ({ title, content, type }) => {
  const getCardIcon = (type) => {
    switch (type) {
      case 'overview':
        return '📚'
      case 'learning':
        return '🛤️'
      case 'monetization':
        return '💰'
      default:
        return '📋'
    }
  }

  const formatContent = (content, type) => {
    if (type === 'learning' && Array.isArray(content)) {
      return (
        <ol className="learning-steps">
          {content.map((step, index) => (
            <li key={index} className="learning-step">
              <span className="step-number">{index + 1}</span>
              <span className="step-content">{step}</span>
            </li>
          ))}
        </ol>
      )
    }
    
    if (type === 'monetization' && Array.isArray(content)) {
      return (
        <ul className="monetization-list">
          {content.map((opportunity, index) => (
            <li key={index} className="monetization-item">
              <span className="opportunity-icon">💼</span>
              <span className="opportunity-text">{opportunity}</span>
            </li>
          ))}
        </ul>
      )
    }
    
    return <p className="card-text">{content}</p>
  }

  return (
    <div className={`skill-card ${type}-card`}>
      <div className="card-header">
        <span className="card-icon">{getCardIcon(type)}</span>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-content">
        {formatContent(content, type)}
      </div>
      <div className="card-footer">
        <div className={`card-accent ${type}-accent`}></div>
      </div>
    </div>
  )
}

export default SkillCard