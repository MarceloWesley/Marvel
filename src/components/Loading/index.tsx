import { CircleNotch } from "phosphor-react";
import { useEffect, useState } from "react";
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
      {finishedTimeout ? <h2>Search not found - Try again</h2> :  <CircleNotch className="spinner" weight="bold" size={50} />}
    </div>
  )
}

//   <CircleNotch className="spinner" weight="bold" size={50} />