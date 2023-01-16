import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export default UserContext;

export function UserProvider(props) {
  const [showModal, setShowModal] = useState(false);
  const [detailChargeModal, setDetailChargeModal] = useState(false);
  const [deleteChargeModal, setDeleteChargeModal] = useState(false);
  const [successCard, setSuccessCard] = useState("");
  const [errorCard, setErrorCard] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    telephone: "",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        showModal,
        setShowModal,
        detailChargeModal,
        setDetailChargeModal,
        deleteChargeModal,
        setDeleteChargeModal,
        successCard,
        setSuccessCard,
        errorCard,
        setErrorCard,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export function userUser() {
  return useContext(UserContext);
}
