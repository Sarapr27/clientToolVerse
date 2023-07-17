import React from "react";
import styles from "./About.css";


const About = () => {
  const teamMembers = [
    {
      name: "Jose Antonio Flores",
      position: "Full Stack Developer",
      education: "Benemerita Universidad Autonoma de Puebla, Academia Henry",
      previousEmployment: "Por definir",
      image: "https://ca.slack-edge.com/TPRS7H4PN-U03HZEVB12R-29f3aebacb75-512",
      linkedin: 'https://www.linkedin.com/in/antonio-flores-desarrollador/'
    },
    {
        name: "",
        position: "",
        education: "",
        previousEmployment: "",
        image: "",
        linkedinUrl:"",
    },
    {
        name: "",
        position: "",
        education: "",
        previousEmployment: "",
        image: "",
        linkedinUrl:"",
    },
    {
        name: "",
        position: "",
        education: "",
        previousEmployment: "",
        image: "",
        linkedinUrl:"",
    },
    {
        name: "",
        position: "",
        education: "",
        previousEmployment: "",
        image: "",
        linkedinUrl:"",
    },
    {
        name: "",
        position: "",
        education: "",
        previousEmployment: "",
        image: "",
        linkedinUrl:"",
    },
    {
        name: "",
        position: "",
        education: "",
        previousEmployment: "",
        image: "",
        linkedinUrl:"",
    },
    {
        name: "",
        position: "",
        education: "",
        previousEmployment: "",
        image: "",
        linkedinUrl:"",
    },
    
  ];

  return (
    <div className={styles.ourTeamSection}>
      <h3 className={styles.ourTeamTitle}>About Us</h3>
      <div className={styles.teamMembersContainer}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamMember}>
            <img className={styles.memberImage} src={member.image} alt={member.name} />
            <div className={styles.memberDetails}>
              <h4 className={styles.memberName}>{member.name}</h4>
              <p className={styles.memberPosition}>{member.position}</p>
              <p className={styles.memberEducation}>Escolaridad: {member.education}</p>
              <p className={styles.memberEmployment}>Trayectoria Reelevante: {member.previousEmployment}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

