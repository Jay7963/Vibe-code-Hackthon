// AI Career Tutor Skill Database
// This simulates an AI response for different skills

const skillDatabase = {
  'python programming': {
    overview: "Python is a beginner-friendly programming language used for web apps, AI, data science, and automation. It's known for its simple syntax and versatility, making it perfect for beginners and professionals alike.",
    learningPath: [
      "Learn Python basics (variables, loops, functions, and data structures like lists and dictionaries)",
      "Build a small project like a calculator, to-do app, or simple game to practice your skills",
      "Explore libraries like Flask (web development), Pandas (data analysis), or Tkinter (desktop apps)"
    ],
    monetization: [
      "Freelance web development projects on Fiverr, Upwork, or local businesses",
      "Data entry automation and web scraping gigs for small businesses",
      "Apply for Python developer internships with local tech startups or remote positions"
    ]
  },
  
  'digital marketing': {
    overview: "Digital marketing involves promoting products or services online through social media, email, content creation, and paid advertising. It's essential for businesses in the digital age and offers flexible career opportunities.",
    learningPath: [
      "Learn digital marketing fundamentals (SEO, social media, email marketing, and content strategy)",
      "Create and manage social media campaigns for a local business or your own project",
      "Get certified in Google Ads, Facebook Ads, or Google Analytics to validate your skills"
    ],
    monetization: [
      "Offer social media management services to local businesses and restaurants",
      "Create and sell digital marketing courses or provide consulting services",
      "Work as a freelance content creator or digital marketing assistant for agencies"
    ]
  },
  
  'graphic design': {
    overview: "Graphic design is the art of visual communication through typography, imagery, and layout. It's used in branding, marketing, web design, and print media, combining creativity with technical skills.",
    learningPath: [
      "Master design software like Adobe Photoshop, Illustrator, or free alternatives like GIMP and Canva",
      "Study design principles (color theory, typography, composition) and create a portfolio of projects",
      "Practice with real projects like logos, social media graphics, or website designs"
    ],
    monetization: [
      "Design logos, business cards, and marketing materials for local businesses",
      "Sell design templates, prints, or custom illustrations on platforms like Etsy or Creative Market",
      "Offer freelance design services on Fiverr or work with marketing agencies and startups"
    ]
  },
  
  'data analysis': {
    overview: "Data analysis involves examining datasets to discover insights, trends, and patterns that help businesses make informed decisions. It combines statistics, programming, and domain knowledge to solve real-world problems.",
    learningPath: [
      "Learn Excel/Google Sheets basics and SQL for data manipulation and database queries",
      "Study statistics fundamentals and practice with Python (Pandas, NumPy) or R for data analysis",
      "Complete real data projects using public datasets and create visualizations with Tableau or Power BI"
    ],
    monetization: [
      "Provide data analysis services for small businesses to improve their operations",
      "Create data reports and dashboards for e-commerce stores or local organizations",
      "Apply for data analyst internships or entry-level positions in various industries"
    ]
  },
  
  'content writing': {
    overview: "Content writing involves creating valuable, engaging written material for websites, blogs, social media, and marketing campaigns. It's essential for digital marketing and helps businesses connect with their audience.",
    learningPath: [
      "Learn writing fundamentals (grammar, style, audience targeting) and practice different content types",
      "Study SEO basics and keyword research to write content that ranks well in search engines",
      "Build a portfolio by writing blog posts, social media content, or offering free articles to local businesses"
    ],
    monetization: [
      "Write blog posts, website copy, or product descriptions for businesses on freelance platforms",
      "Create and monetize your own blog through advertising, affiliate marketing, or sponsored posts",
      "Offer copywriting services for email campaigns, sales pages, or social media content"
    ]
  },
  
  'web development': {
    overview: "Web development involves building websites and web applications using programming languages like HTML, CSS, JavaScript, and various frameworks. It's a high-demand skill in the digital economy.",
    learningPath: [
      "Learn HTML, CSS, and JavaScript fundamentals to build interactive web pages",
      "Practice by building personal projects like a portfolio website, landing page, or simple web app",
      "Explore modern frameworks like React, Vue.js, or backend technologies like Node.js or Django"
    ],
    monetization: [
      "Build websites for local businesses, restaurants, or freelancers",
      "Create custom web applications or e-commerce sites for clients",
      "Apply for junior web developer positions or intern with tech companies"
    ]
  },
  
  'social media management': {
    overview: "Social media management involves creating, scheduling, and analyzing content across social platforms to build brand awareness and engagement. It's crucial for modern business marketing strategies.",
    learningPath: [
      "Learn platform-specific strategies for Instagram, Facebook, LinkedIn, TikTok, and Twitter",
      "Practice content creation, scheduling tools (Hootsuite, Buffer), and basic graphic design",
      "Study social media analytics and advertising to measure and improve campaign performance"
    ],
    monetization: [
      "Manage social media accounts for local businesses, influencers, or personal brands",
      "Offer social media consulting services or create social media strategies for startups",
      "Work as a social media coordinator for marketing agencies or in-house marketing teams"
    ]
  },
  
  'excel': {
    overview: "Microsoft Excel is a powerful spreadsheet application used for data organization, analysis, and visualization. It's essential in almost every industry for financial modeling, reporting, and business analysis.",
    learningPath: [
      "Master Excel basics (formulas, functions, pivot tables, and data formatting)",
      "Learn advanced features like macros, VBA, data analysis tools, and dashboard creation",
      "Practice with real business scenarios like budget planning, sales analysis, or inventory management"
    ],
    monetization: [
      "Provide Excel automation and dashboard services for small businesses",
      "Offer data entry, cleanup, and analysis services using Excel",
      "Teach Excel skills through online tutoring or create Excel templates to sell"
    ]
  }
}

// Function to get skill information with fuzzy matching
export const getSkillInfo = (skillInput) => {
  const normalizedInput = skillInput.toLowerCase().trim()
  
  // Direct match
  if (skillDatabase[normalizedInput]) {
    return {
      skillName: skillInput,
      ...skillDatabase[normalizedInput]
    }
  }
  
  // Fuzzy matching - check if input contains any key
  for (const [key, value] of Object.entries(skillDatabase)) {
    if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
      return {
        skillName: skillInput,
        ...value
      }
    }
  }
  
  // Default response for unknown skills
  return {
    skillName: skillInput,
    overview: `${skillInput} is an emerging skill with growing opportunities in today's digital economy. This skill involves specialized knowledge and techniques that can be developed through dedicated learning and practice.`,
    learningPath: [
      `Research and understand the fundamentals of ${skillInput} through online courses and tutorials`,
      `Find practical projects or volunteer opportunities to apply your ${skillInput} knowledge`,
      `Connect with professionals in the field and consider mentorship or certification programs`
    ],
    monetization: [
      `Offer ${skillInput} services to small businesses or individuals in your network`,
      `Create educational content or tutorials about ${skillInput} to share your expertise`,
      `Look for entry-level positions or freelance opportunities that require ${skillInput} skills`
    ]
  }
}

// Function to get all available skills for suggestions
export const getAvailableSkills = () => {
  return Object.keys(skillDatabase).map(skill => 
    skill.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  )
}