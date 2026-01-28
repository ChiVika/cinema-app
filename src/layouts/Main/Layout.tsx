import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
    return(
        <>
            <header className={styles['header']}>
                <div className={styles['header__inner']}>
                    <Link to='/' className={styles['header__logo']}>
                        <img src="/logo.png" alt="Логотип" width={118} height={34}/>
                    </Link>
                    <nav className={styles['header__navs']}>
                        <div className={styles['header__navs--block']}>
                            <Link to='/cinema' className={styles['header__nav']}>
                                <img src="/profile.svg" alt="Профиль" width={24} height={24}/>
                                Профиль
                            </Link>
                            <Link to='/ticket' className={styles['header__nav']}>
                                <img src="/ticket.svg" alt="Билеты" width={24} height={24}/>
                                Билеты
                            </Link>
                        </div>
                        
                        <div className={styles['header__navs--block']}>
                            <button className={styles['header__nav']}>
                                <img src="/exit.svg" alt="Выйти" width={24} height={24}/>
                                Выйти
                            </button>
                            <button>
                                <img src="/mode-day.svg" alt="Дневной режим" width={24} height={24}/>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
            
            <main className={styles['content']}>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;