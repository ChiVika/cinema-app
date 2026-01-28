import cn from 'classnames';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.props';



function Button({children, className, variant = 'main',  ...props}: ButtonProps){
    return(
        <>
            <button className={cn(styles['button'], styles['accent'], className,{
                [styles['main']]: variant == 'main',
                [styles['secondory']]: variant == 'secondary'
            }
                
            )} {...props}>{children}</button>
        </>
    )
}

export default Button;

