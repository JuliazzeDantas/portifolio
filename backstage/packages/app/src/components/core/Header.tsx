
import './core-styles/core-page.css';

export const Header: React.FC<{title?: string}> = ({ title }) => {
    return (
        <div className='header'>
            {title}
        </div>
    );
}