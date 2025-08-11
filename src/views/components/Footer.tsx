import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiEnemIcon from "../../assets/api-enem-icon.ico"
import type { JSX } from "react";

function Footer(): JSX.Element {
    return (
        <footer className="border-t-3 border-dark-highlight">
            <div className="container mx-auto flex justify-between items-center py-3 px-3 text-text">
                <div>
                    <a href="https://github.com/MosukaSan/daily-enem-public" className="hover:text-text-hover text-2xl"><FontAwesomeIcon icon={faGithub} /></a>
                </div>
                <div onClick={() => window.location.href = "https://enem.dev/"} className="group flex gap-3 items-center hover:cursor-pointer hover:text-text-hover">
                    <h3 className="font-bold">API<br />Enem</h3>
                    <img src={apiEnemIcon} alt="api enem image" className="h-9 group-hover:opacity-80" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;