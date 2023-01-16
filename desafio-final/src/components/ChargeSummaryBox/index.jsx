import { useEffect } from "react";
import { useState } from "react";
import { maskValues } from "../../utils/functions";
import "./style.css";

function ChargeSummaryBox({ icon, title, object, backgroundColor }) {
  const [subtitle, setSubtitle] = useState(0);

  useEffect(() => {
    calcSubtitle();
  }, [object]);

  function calcSubtitle() {
    const calculating = object.reduce((previous, current) => {
      if (current.valor) {
        return previous + current.valor;
      } else {
        return previous;
      }
    }, 0);

    setSubtitle(calculating);
  }

  return (
    <div className={"charge__box " + backgroundColor}>
      <img src={icon} />
      <div className='charge__texts'>
        <h3>{title}</h3>
        <h1>{maskValues(subtitle)}</h1>
      </div>
    </div>
  );
}

export default ChargeSummaryBox;
