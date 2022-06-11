import { useEffect, useState } from "react";
import shield from '../../assets/shield.png'
import './styles.scss'

export function Loading(){
  const [finishedTimeout, setFinishedTimeout] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setFinishedTimeout(true);
    }, 12000);

    return () => clearTimeout(id);
  }, []);
  
  return(
    <div className="spinner-container">
      {finishedTimeout ? <h2 className="title-loading">Search not found - Try again</h2> :  <img className="shield spinner" src={shield} alt="" />}
    </div>
  )
}

