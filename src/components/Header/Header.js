import styles from './Header.module.css'
import {Typography} from "@mui/material";

const Header = () => {
    return (
        <div className={styles.header}>

            <Typography variant={"h2"}>
                Pokedex
            </Typography>

        </div>
    )
}

export default Header
