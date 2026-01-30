import styles from './ButtonHeader.module.css';
import type { ButtonHeaderProps } from './ButtonHeader.props';

const ButtonHeader = ({ variant, ...props }: ButtonHeaderProps) => {
  return(
    <>
      <button className={styles['ButtonHeader']} {...props}>
        {variant == 'back' && <img src="/Arrow_Left.svg" alt="Шаг назад" width={24} height={24}/>}
        {variant == 'close' && <img src="/close.svg" alt="Шаг назад" width={24} height={24}/>}
      </button>
    </>
  );
  
};
export default ButtonHeader;