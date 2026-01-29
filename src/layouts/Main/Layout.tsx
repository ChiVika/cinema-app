import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import cn from 'classnames';

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
              <Link to='/profile' className={styles['header__nav']}>
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

      <footer className={styles['footer']}>
        <nav className={styles['footer__navs']}>
          <NavLink to='/' className={({ isActive }) => (cn(styles['footer__link'], {
            [styles['active']]: isActive,
          }))}>
            <img src="/Movie.svg" alt="Афиша" width={24} height={24}/>
            Афиша
          </NavLink>
          <NavLink to='/ticket' className={({ isActive }) => (cn(styles['footer__link'], {
            [styles['active']]: isActive,
          }))}>
            <img src="/ticket.svg" alt="Билеты" width={24} height={24}/>
            Билеты
          </NavLink>
          <NavLink to='/profile' className={({ isActive }) => (cn(styles['footer__link'], {
            [styles['active']]: isActive,
          }))}>
            <img src="/profile.svg" alt="Профиль" width={24} height={24}/>
            Профиль
          </NavLink>
        </nav>
      </footer>
    </>
  );
};

export default Layout;