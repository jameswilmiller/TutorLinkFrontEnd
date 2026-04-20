import { Link } from "react-router-dom";
import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand-column">
            <Link to="/" className="footer__brand">
              TutorLink
            </Link>
            <p className="footer__description">
              Connecting students with trusted tutors for online and in-person learning.
            </p>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Connect</h3>

            <div className="footer__socials">
              <a href="https://github.com/jameswilmiller" className="footer__social" aria-label="Github">
                <FaGithub size={18}/>
              </a>
              <a href="https://www.linkedin.com/in/james-w-miller/" className="footer__social" aria-label="Linkedin">
                <FaLinkedin/>
              </a>
              
            </div>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Students</h3>
            <Link to="/browse" className="footer__link">Find Tutors</Link>
            <Link to="/browse" className="footer__link">Browse Subjects</Link>
            <Link to="/help" className="footer__link">How It Works</Link>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Tutors</h3>
            <Link to="/become-a-tutor" className="footer__link">Become a Tutor</Link>
            <Link to="/help" className="footer__link">Tutor Guide</Link>
            <Link to="/about" className="footer__link">About TutorLink</Link>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Support</h3>
            <Link to="/help" className="footer__link">Help Centre</Link>
            <Link to="/about" className="footer__link">Contact</Link>
            <Link to="/privacy" className="footer__link">Privacy Policy</Link>
            <Link to="/terms" className="footer__link">Terms of Use</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 TutorLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;