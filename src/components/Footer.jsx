import QuickAccess from './QuickAccess.jsx'
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <QuickAccess />

      <div className="footer-grid">
        <div className="footer-col">
          <p className="footer-owner">
            This website belongs to <strong>LawNexus Services Division</strong>
            <br />Ministry of Law &amp; Justice, Government of India
          </p>
        </div>

        <div className="footer-col">
          <h5>Useful Links</h5>
          <a href="#">About LawNexus</a>
          <a href="#">Contact Us</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>

        <div className="footer-col">
          <h5>&nbsp;</h5>
          <a href="#">Privacy Policy</a>
          <a href="#">Help / FAQ</a>
          <a href="#">Feedback</a>
        </div>

        <div className="footer-col">
          <h5>Contact Us</h5>
          <p><Phone size={14} /> 011-23387210</p>
          <p><Mail size={14} /> support-lawnexus@nic.in</p>
          <p><MapPin size={14} /> 13th Floor, Jeevan Tara Building, Parliament Street, New Delhi - 110001</p>
        </div>

        <div className="footer-col">
          <h5>Follow Us</h5>
          <div className="social-row">
            <a href="#"><Facebook size={16} /></a>
            <a href="#"><Twitter size={16} /></a>
            <a href="#"><Youtube size={16} /></a>
            <a href="#"><Linkedin size={16} /></a>
          </div>
          <span className="updated">Last Updated: 31 May 2025 11:30 AM</span>
        </div>
      </div>
    </footer>
  )
}
