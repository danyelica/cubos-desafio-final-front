import Aside from "../../components/Aside";
import ChargeSummaryBox from "../../components/ChargeSummaryBox";
import PendingChargeIcon from "../../assets/icon-pending-charge.svg";
import LateChargeIcon from "../../assets/icon-late-charge.svg";
import PaidChargeIcon from "../../assets/icon-pay-charge.svg";
import Header from "../../components/Header";
import "./style.css";
import ListBox from "../../components/ChargeListBox";
import { useEffect, useState } from "react";
import { getCharges, getClients } from "../../utils/requests";
import { orderbyArrayId } from "../../utils/functions";
import { clear } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function Home() {
  const [overdueCharges, setOverdueCharges] = useState(["Cobranças Vencidas"]);
  const [expectedCharges, setExpectedCharges] = useState([
    "Cobranças Previstas",
  ]);
  const [paidCharges, setPaidCharges] = useState(["Cobranças Pagas"]);
  const [defaultersClients, setDefaultersClients] = useState([
    "Clientes Inadimplentes",
  ]);
  const [nonDefaultersClients, setNonDefaultersClients] = useState([
    "Clientes em dia",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    loadInfo();
  }, []);

  async function loadInfo() {
    try {
      const response = await getClients();
      const newResponse = await getCharges();

      const clients = response.data;
      const charges = newResponse.data;

      let paid = charges.filter((charge) => charge.status === true);
      paid = orderbyArrayId(paid, false);
      setPaidCharges([...paidCharges, ...paid]);

      let unpaid = charges.filter((charge) => charge.status === false);
      let overdue = unpaid.filter(
        (charge) => new Date(charge.vencimento) < new Date()
      );
      let expected = unpaid.filter(
        (charge) => !(new Date(charge.vencimento) < new Date())
      );
      overdue = orderbyArrayId(overdue, false);
      expected = orderbyArrayId(expected, false);
      setOverdueCharges([...overdueCharges, ...overdue]);
      setExpectedCharges([...expectedCharges, ...expected]);

      let defaulters = clients.filter((client) => client.status === false);
      defaulters = orderbyArrayId(defaulters, false);
      setDefaultersClients([defaultersClients, ...defaulters]);

      let nonDefaulters = clients.filter((client) => client.status === true);
      nonDefaulters = orderbyArrayId(nonDefaulters, false);
      setNonDefaultersClients([...nonDefaultersClients, ...nonDefaulters]);
    } catch (error) {
      if (error.response.data.message) {
        if (
          error.response.data.message.includes("jwt expired") ||
          error.response.data.message.includes("Não autorizado") ||
          error.response.data.message.includes("invalid signature") ||
          error.response.data.message.includes("jwt malformed") ||
          error.response.data.message.includes("invalid token")
        ) {
          alert("Sua sessão expirou, faça o login novamente!");
          clear();
          navigate("/sign-in");
          return;
        }
      }
    }
  }

  return (
    <section className='home'>
      <Header title='Resumo das cobranças' />
      <Aside />
      <div className='home__container'>
        <div className='home__summaries'>
          <ChargeSummaryBox
            icon={PaidChargeIcon}
            title='Cobranças Pagas'
            object={paidCharges}
            backgroundColor='summary--blue'
          />
          <ChargeSummaryBox
            icon={LateChargeIcon}
            title='Cobranças Vencidas'
            object={overdueCharges}
            backgroundColor='summary--red'
          />
          <ChargeSummaryBox
            icon={PendingChargeIcon}
            title='Cobranças Previstas'
            object={expectedCharges}
            backgroundColor='summary--yellow'
          />
        </div>
        <div className='home__charges'>
          {overdueCharges.length > 0 && (
            <ListBox
              object={overdueCharges}
              type={"charge"}
              key={overdueCharges[0].id}
            />
          )}
          {expectedCharges.length > 0 && (
            <ListBox
              object={expectedCharges}
              type={"charge"}
              key={expectedCharges[0].id}
            />
          )}
          {paidCharges.length > 0 ? (
            <ListBox
              object={paidCharges}
              type={"charge"}
              key={paidCharges[0].id}
            />
          ) : (
            <ListBox object={paidCharges} type={"charge"} key={3} />
          )}
        </div>
        <div className='home__clients'>
          {defaultersClients.length > 0 ? (
            <ListBox
              object={defaultersClients}
              type={"client"}
              key={defaultersClients[0].id}
            />
          ) : (
            <ListBox object={defaultersClients} type={"client"} key={2} />
          )}
          {nonDefaultersClients.length > 0 ? (
            <ListBox
              object={nonDefaultersClients}
              type={"client"}
              key={nonDefaultersClients[0].id}
            />
          ) : (
            <ListBox object={nonDefaultersClients} type={"client"} key={1} />
          )}
        </div>
      </div>
    </section>
  );
}
export default Home;
