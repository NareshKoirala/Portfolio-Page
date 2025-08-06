import { useState } from "react";
import styles from "../styles/resume.module.css";

export default function Resume() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleView = () => {
    // Open PDF in new tab for viewing
    window.open("/resume.pdf", "_blank");
  };

  const handleDownload = () => {
    // Create a download link for the PDF
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Naresh_Koirala_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.resumeContainer}>
      <div className={styles.resumeWrapper}>
        {/* Toggle Button */}
        <button
          onClick={toggleExpanded}
          className={styles.toggleButton}
          aria-label={isExpanded ? "Collapse resume section" : "Expand resume section"}
          title={isExpanded ? "Collapse" : "Expand"}
        >
          <span className={styles.resumeLabel}>Resume</span>
          <div className={`${styles.arrow} ${isExpanded ? styles.arrowUp : styles.arrowDown}`}>
            ↑
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className={styles.expandedContent}>
            <div className={styles.resumeTitle}>Resume</div>
            <div className={styles.resumeActions}>
              <button
                onClick={handleView}
                className={`${styles.actionButton} ${styles.viewButton}`}
                aria-label="View resume"
                title="View Resume"
              >
                <span className={styles.buttonIcon}>👁️</span>
                View
              </button>
              <button
                onClick={handleDownload}
                className={`${styles.actionButton} ${styles.downloadButton}`}
                aria-label="Download resume"
                title="Download Resume"
              >
                <span className={styles.buttonIcon}>⬇️</span>
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
