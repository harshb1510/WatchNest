import "./footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from '@mui/icons-material/Email';
const Footer = () => {
  return (
    <section className="footer">
      <div className="footerContainer">
        <div className="footerLeft">
          <h5 className="footerleftLogo">Watch brand</h5>
          <p className="footerleftRights">
            © 2022 Chakra Templates. All rights reserved
          </p>
          <div className="footerleftSocial">
            <TwitterIcon />
            <FacebookIcon />
            <InstagramIcon />
          </div>
        </div>
        <div className="footerCenter my-3">
          <h6>Company</h6>
          <div className="companyListing">
          <span>About Us</span>
          <span>Contact Us</span>
          <span>Pricing</span>
          <span>Testimonials</span>
          <span>Terms of Service</span>
          </div>
        </div>
        <div className="footerRight">
            <h5>Stay Up to Date</h5>
            <input type="email"placeholder="Your Email Address" className="footerrightEmail"/>
            <button className="footerrightIcon">
            <EmailIcon/>
            </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
