import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


const Footer: React.FC = () => {

    return (
        
        <div className="footer-container">
            <span style={{ paddingTop: "30px", fontWeight: "bold", color: "#e4e6ed", textShadow: "black 1px 0 10px"}}>Contact and About</span>
                <div className="fa-icon-container">
                    
                    <a href="mailto:billhuynh012@gmail.com"><FontAwesomeIcon icon={faDiscord} className="icons" size="2x" transform="grow-1" color="white" fixedWidth/></a>
                    <FontAwesomeIcon icon={faGoogle} className="icons" size="2x" color="white" fixedWidth/>
                    <FontAwesomeIcon icon={faCircleInfo} className="icons" size="2x" color="white"></FontAwesomeIcon>
                </div>  
            
        </div>
    )
}

export default Footer;