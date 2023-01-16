import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DefaulterIcon from "../../assets/icon-defaulter-clients.svg";
import NoDefaulterIcon from "../../assets/icon-no-defaulter-clients.svg";
import { maskCPF, maskValues } from "../../utils/functions";
import "./style.css";

function ListBox({ object, type }) {
  const [newObject, setNewObject] = useState([]);

  useEffect(() => {
    reajustingObject();
  }, [object]);

  function reajustingObject() {
    return setNewObject(object.slice(1, 5));
  }

  function handleBox() {
    if (type === "charge") {
      if (object[0] === "Cobranças Pagas") {
        return {
          title: "Cobranças Pagas",
          number: object.length - 1,
          color: "list--blue",
        };
      }

      if (object[0] === "Cobranças Vencidas") {
        return {
          title: object[0],
          number: object.length - 1,
          color: "list--red",
        };
      } else if (object[0] === "Cobranças Previstas") {
        return {
          title: object[0],
          number: object.length - 1,
          color: "list--yellow",
        };
      }
    }

    if (type === "client") {
      if (object[0] === "Clientes em dia") {
        return {
          title: "Clientes em dia",
          icon: NoDefaulterIcon,
          number: object.length - 1,
          color: "list--blue",
        };
      }
      return {
        title: "Clientes Inadimplentes",
        number: object.length - 1,
        color: "list--red",
        icon: DefaulterIcon,
      };
    }
  }

  function verifyingLink() {
    if (handleBox().title) {
      const filter = handleBox().title.split(" ");
      if (filter[0].includes("Clientes")) {
        if (filter[2]) {
          return `/home/clients?filtro=adimplentes`;
        }
        return `/home/clients?filtro=${filter[1]}`;
      }
      return `/home/charges?filtro=${filter[1]}`;
    }
  }

  return (
    <div className='list__box'>
      <div className='flex-column box__table'>
        <div className='box--top'>
          {handleBox().icon ? (
            <div className='top__title flex-row'>
              <img src={handleBox().icon} />
              <h1>{handleBox().title}</h1>
            </div>
          ) : (
            <div className='top__title-single'>
              <h1>{handleBox().title}</h1>
            </div>
          )}
          <h2 className={"top__number " + handleBox().color}>
            {handleBox().number}
          </h2>
        </div>
        <table className='list__table'>
          <thead className='list__thead'>
            <tr className='table__row table__th'>
              <th>Cliente</th>
              <th>{type === "charge" ? "ID da cob." : "ID do clie."}</th>
              <th>{type === "charge" ? "Valor" : "CPF"}</th>
            </tr>
          </thead>
          <tbody className='list__tbody'>
            {newObject.map((client) => {
              if (!client.valor && typeof client[0] === "string") return;
              return (
                <tr key={client.id} className='table__row'>
                  <td>{client.nome}</td>
                  <td>{client.id}</td>
                  <td>
                    {client.valor
                      ? maskValues(client.valor)
                      : maskCPF(client.cpf)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link to={verifyingLink()} className='list__link'>
        Ver todos
      </Link>
    </div>
  );
}

export default ListBox;
