import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General inquiries",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Add email service integration here
  };

  return (
    <Layout>
      <Head>
        <meta name="keywords" content="Naresh Prasad Koirala, contact, web developer, React, Next.js" />
      </Head>
      <section className={styles.contactContainer} aria-labelledby="contact-title">
        <div className={styles.contentSection}>
          <div className={styles.textContent}>
            <br />
            <h1 id="contact-title" className={styles.title}>Contact Me</h1>
            <div className={styles.paragraphContainer}>
              <p className={styles.paragraph}>
                Open to any adventure that involves learning and making cool stuff!
              </p>
              <p className={styles.paragraph}>
                Whether you have a project in mind, want to collaborate, or just want to say hi — 
                I'd love to hear from you. Let's build something amazing together.
              </p>
            </div>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <span>chelseanaresh10@gmail.com</span>
              </div>
              
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <span>+1 780 916 5002</span>
              </div>
              
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>Edmonton, Alberta, Canada</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={styles.formSelect}
              >
                <option value="General inquiries">General inquiries</option>
                <option value="Project collaboration">Project collaboration</option>
                <option value="Job opportunity">Job opportunity</option>
                <option value="Technical support">Technical support</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.formTextarea}
                required
              />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
