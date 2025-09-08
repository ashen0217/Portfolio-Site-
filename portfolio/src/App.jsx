import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./App.css";
import StarBackground from "./StarBackground";

function App() {
  const threeCanvas = useRef(null);

  useEffect(() => {
    // Three.js scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#181c2f");
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(220, 220);
    if (threeCanvas.current) {
      threeCanvas.current.innerHTML = "";
      threeCanvas.current.appendChild(renderer.domElement);
    }

    // Enhanced 3D geometry (animated cube)
    const geometry = new THREE.BoxGeometry();
    // Main cube material: lighter, more visible color
    const material = new THREE.MeshPhysicalMaterial({
      color: "#f4f4f4", // light color for visibility
      metalness: 0.7,
      roughness: 0.18,
      clearcoat: 0.6,
      clearcoatRoughness: 0.12,
      sheen: 0.7,
      sheenColor: new THREE.Color("#8f5cff"),
      transmission: 0.08,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add black wireframe outline for cube edges
    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: "#181c2f" })
    );
    cube.add(wireframe);

    // Glowing outline (slightly larger, transparent cube)
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: "#00c6fb",
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const outlineCube = new THREE.Mesh(
      new THREE.BoxGeometry(1.08, 1.08, 1.08),
      outlineMaterial
    );
    scene.add(outlineCube);

    // Lighting
    const ambientLight = new THREE.AmbientLight("#fff", 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight("#8f5cff", 1.2, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    const accentLight = new THREE.PointLight("#00c6fb", 0.7, 10);
    accentLight.position.set(-3, -2, 2);
    scene.add(accentLight);

    // Animation loop with floating and scaling
    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.01;
      cube.rotation.x += 0.012;
      cube.rotation.y += 0.014;
      // Floating effect
      cube.position.y = Math.sin(t) * 0.18;
      // Pulsing scale
      const scale = 1 + Math.sin(t * 2) * 0.07;
      cube.scale.set(scale, scale, scale);
      // Outline follows cube
      outlineCube.position.copy(cube.position);
      outlineCube.rotation.copy(cube.rotation);
      outlineCube.scale.set(scale * 1.08, scale * 1.08, scale * 1.08);
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      outlineMaterial.dispose();
      wireframe.geometry.dispose();
      wireframe.material.dispose();
    };
  }, []);

  return (
    <>
      <StarBackground />
      <div className="portfolio-container">
        <header className="portfolio-header">
          <nav className="portfolio-nav">
            <div className="logo">Ashen Madusanka Bamunusinghe</div>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <section className="hero" id="home">
            <div className="hero-left">
              <img
                src="/Ashen1.jpg"
                alt="Ashen Madusanka"
                className="profile-photo-top"
              />
            </div>
            <div className="hero-right">
              <div
                ref={threeCanvas}
                className="three-canvas"
                style={{ margin: "0 auto 1.5rem auto" }}
              ></div>
              <h1>
                Hello, I'm <span>Ashen Madusanka</span>
              </h1>
              <h2>
                Software Engineer | Full Stack Developer | Machine Learning
                Engineer
              </h2>
              <p>
                Results-driven software engineer with a passion for building
                scalable web applications and modern user experiences.
                Experienced in React, Node.js, and cloud technologies.
              </p>
              <a href="#projects" className="cta-btn">
                View My Work
              </a>
              <a
                href="/Ashen_Madusanka_CV.pdf"
                className="cta-btn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: "1rem",
                  background: "#8f5cff",
                  color: "#fff",
                }}
              >
                Download CV
              </a>
            </div>
          </section>
        </header>
        <main>
          <section className="about" id="about">
            <img
              src="/Ashen2.jpg"
              alt="Ashen Madusanka"
              className="profile-photo-about"
            />
            <h2>About Me</h2>
            <p>
              I am a dedicated and detail-oriented software engineer with
              experience in full stack development, specializing in JavaScript,
              React, Node.js, and RESTful APIs. I enjoy solving complex problems
              and delivering high-quality solutions. My background includes
              collaborating with cross-functional teams and contributing to
              open-source projects.
            </p>
            <ul>
              <li>
                <strong>Skills:</strong> JavaScript, React, Node.js, Express,
                MongoDB, SQL, HTML, CSS, Git, REST APIs, Docker, AWS
              </li>
              <li>
                <strong>Education:</strong> BSc (Hons) in Computer Science
              </li>
              <li>
                <strong>Languages:</strong> English, Sinhala
              </li>
            </ul>
          </section>
          <section className="projects" id="projects">
            <h2>Projects</h2>
            <div className="project-list">
              {/* Featured/Manual Projects */}
              <div className="project-card">
                <h3>Personal Portfolio Website</h3>
                <p>
                  Modern, responsive portfolio site built with React and Vite to
                  showcase my skills, projects, and experience.
                </p>
              </div>
              <div className="project-card">
                <h3>Task Manager App</h3>
                <p>
                  Full stack MERN application for managing daily tasks,
                  featuring authentication, CRUD operations, and a clean UI.
                </p>
              </div>
              <div className="project-card">
                <h3>E-commerce Platform</h3>
                <p>
                  Developed a scalable e-commerce platform with product
                  listings, shopping cart, and payment integration using React
                  and Node.js.
                </p>
              </div>
              {/* GitHub Projects */}
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/BankManagementSystemAppletByJAVA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bank Management System Applet (Java)
                  </a>
                </h3>
                <p>
                  A Java applet for managing basic banking operations with a
                  GUI.
                </p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/PlayzoneManagementSystem-By-MERN-Stack"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Playzone Management System (MERN)
                  </a>
                </h3>
                <p>
                  Seamless management for playzones and recreational centers
                  using the MERN stack.
                </p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/Python-Telegram-Ai-chatbot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Python Telegram AI Chatbot
                  </a>
                </h3>
                <p>AI-powered Telegram chatbot built with Python.</p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/OnlineStaffManagementSystemBy-JAVAJSPServletWebsite"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Online Staff Management System (Java/JSP/Servlet)
                  </a>
                </h3>
                <p>Digital platform for efficient workforce management.</p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/Glowing-flowers-by-JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Glowing Flowers (JavaScript)
                  </a>
                </h3>
                <p>Creative glowing flowers animation using JavaScript.</p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/Music-PlayerApp-Html-css-JS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Music Player App (HTML/CSS/JS)
                  </a>
                </h3>
                <p>
                  Music player website created using HTML, CSS, and JavaScript.
                </p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/Python-Jarvis-voice-assistant"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Python Jarvis Voice Assistant
                  </a>
                </h3>
                <p>Voice assistant programmed in Python.</p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/Finance-Tracker-App-FinTech"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Finance Tracker App (Kotlin)
                  </a>
                </h3>
                <p>Finance tracker app developed in Kotlin.</p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/ChatApp-By-MERN"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat App (MERN)
                  </a>
                </h3>
                <p>Real-time chat application using the MERN stack.</p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/EcommerceSite-Frontend-HTML-CSS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    E-commerce Site Frontend (HTML/CSS)
                  </a>
                </h3>
                <p>
                  Frontend design for an e-commerce website using HTML and CSS.
                </p>
              </div>
              <div className="project-card">
                <h3>
                  <a
                    href="https://github.com/ashen0217/New-Year-Countdown-Website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    New Year Countdown Website
                  </a>
                </h3>
                <p>
                  Countdown website for New Year using HTML, CSS, and
                  JavaScript.
                </p>
              </div>
              {/* Add more as needed */}
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href="https://github.com/ashen0217?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn"
              >
                View All My GitHub Projects
              </a>
            </div>
          </section>
          {/* Achievements Section */}
          <section className="achievements" id="achievements">
            <h2>Achievements</h2>
            <ul>
              <li>
                Developed 40+ public projects in various languages (Java,
                Python, JavaScript, C++, R, Kotlin, etc.)
              </li>
              <li>
                Created AI-powered Telegram chatbot and Python voice assistant
              </li>
              <li>
                Built scalable management systems for banking, staff, and
                playzones
              </li>
              <li>Published open-source code and tutorials on GitHub</li>
              <li>
                Consistent contributor to open-source and personal projects
              </li>
            </ul>
          </section>
          {/* Education Section */}
          <section className="education" id="education">
            <h2>Education</h2>
            <ul>
              <li>
                <strong>BSc (Hons) in Computer Science</strong> - SLIIT, Malabe,
                Sri Lanka (2021 - 2025)
              </li>
              <li>
                <strong>G.C.E. Advanced Level</strong> - Physical Science Stream
                (2018 - 2020)
              </li>
              <li>
                <strong>G.C.E. Ordinary Level</strong> (2017)
              </li>
            </ul>
          </section>
          {/* Certifications Section */}
          <section className="certifications" id="certifications">
            <h2>Certifications</h2>
            <ul>
              <li>Certificate in Full Stack Web Development</li>
              <li>Certificate in Python Programming</li>
              <li>Certificate in Java Application Development</li>
              <li>Certificate in Data Science Fundamentals</li>
              <li>Certificate in Cloud Computing (AWS)</li>
            </ul>
          </section>
          <section className="contact" id="contact">
            <h2>Contact</h2>
            <p>Email: ashen0217@gmail.com</p>
            <p>Phone: +94 76 695 4545</p>
            <p>
              LinkedIn:{" "}
              <a
                href="http://linkedin.com/in/ashen-bamunusingha-39bb1a273"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/ashenmadusanka
              </a>
            </p>
            <p>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/share/15KPQjrXwB/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook.com/Ashen Bamunusinghe
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/ashen0217"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github.com/ashen0217
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/don_ashen_vibecoder/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram.com/don_ashen_vibecoder
              </a>
            </p>
            <p>
              Medium:{" "}
              <a
                href="https://medium.com/@ashen0217"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium.com/@ashen0217
              </a>
            </p>
          </section>
        </main>
        <footer className="portfolio-footer">
          <p>
            &copy; {new Date().getFullYear()} Ashen Madusanka. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
