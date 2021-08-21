import classes from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return <footer className={classes.footer}>

        <div className={classes.socialMedia}>
            <div>
                <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div>
                <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div>
                <FontAwesomeIcon icon={faYoutube} />
            </div>
            <div>
                <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div>
                <FontAwesomeIcon icon={faWhatsapp} />
            </div>
        </div>
        <div>

            <address>
                Dezrobirii Street, no 85, Craiova, Romania. E-mail address : asct1977ro@gmail.com. Mobile : 0040728181218.
            </address>
        </div>


    </footer>
}

export default Footer