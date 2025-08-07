import styles from "../styles/skills.module.css";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  _id?: string;
  category: string;
  skills: Skill[];
}

interface SkillsCardProps {
  skillCategories: SkillCategory[];
}

export default function SkillsCard({ skillCategories }: SkillsCardProps) {
  return (
    <div className={styles.skillsSection}>
          <div className={styles.skillsGrid}>
            {skillCategories.map((category: SkillCategory, categoryIndex: number) => (
              <div key={category._id || category.category} className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
                <div className={styles.skillsListContainer}>
                  {category.skills.map((skill: Skill, skillIndex: number) => (
                    <div key={skill.name} className={styles.skillItem}>
                      <div className={styles.skillHeader}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={styles.skillProgress}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
