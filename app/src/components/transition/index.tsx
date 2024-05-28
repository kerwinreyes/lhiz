import Fade from "@mui/material/Fade";
import { ReactNode, useEffect, useState } from "react";

type TailwindGridItemProps = {
    children: ReactNode;
    className: string
  };
const TransitionFade: React.FC<TailwindGridItemProps> = ({ children, className }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
  
    useEffect(() => {
      setLoaded(true);
    }, []);
  
    return (
      <Fade in={loaded} timeout={1000}>
        <div className={className}>{children}</div>
      </Fade>
    );
  };

  export default TransitionFade