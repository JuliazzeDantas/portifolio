

import './styles/style-sidebar.css';



export const BottomSection: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='bottom-section'>
      {children}
    </div>
  );
};
