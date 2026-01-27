import cn from 'classnames';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.props';



function Button({children, className, appointment = 'main',  ...props}: ButtonProps){
    return(
        <>
            <button className={cn(styles['button'], styles['accent'], className,{
                [styles['main']]: appointment == 'main',
                [styles['secondory']]: appointment == 'secondory'
            }
                
            )} {...props}>{children}</button>
        </>
    )
}

export default Button;

