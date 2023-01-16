export function validateEmail(email) {
    if (!email) {
        return { status: false, message: "O campo email é Obrigatório" };
    }
    const validEmail = email.trim().split(" ");

    if (validEmail.length > 1) {
        return { status: false, message: "O email deve ser um email válido" };
    }
    const verifyAtSign = email.indexOf("@");
    const verifyPonit = email.indexOf(".", verifyAtSign + 2);

    if (verifyAtSign === -1) {
        return { status: false, message: "O email deve ser um email válido" };
    }
    if (verifyPonit === -1) {
        return { status: false, message: "O email deve ser um email válido" };
    }
    return { status: true, email };
}
export function validateCPF(cpf) {
    if (!cpf) {
        return { status: false, message: "O campo CPF é Obrigatório" };
    }
    const cpfSplit = cpf.split("");
    const validecpf = cpfSplit.filter((item) => {
        return item !== "." && item !== "-";
    });
    if (validecpf.length !== 11) {
        return { status: false, message: "O CPF deve ser válido" };
    }
    cpf = validecpf.reduce((acum, value) => acum + value);

    return { status: true, cpf };
}
export function validateTelephone(telephone) {
    if (!telephone) {
        return { status: false, message: "O campo Telefone é Obrigatório" };
    }
    const telephoneSplit = telephone.split("");
    const valideTelephone = telephoneSplit.filter((item) => {
        return (
            item !== "+" &&
            item !== "-" &&
            item !== " " &&
            item !== "(" &&
            item !== ")"
        );
    });
    if (valideTelephone.length < 10) {
        return { status: false, message: "Informe o DDD + Numero" };
    }
    telephone = valideTelephone.reduce((acum, value) => acum + value);
    return { status: true, telephone };
}
export function validateCEP(cep) {
    const cepSplit = cep.split("");
    const valideCEP = cepSplit.filter((item) => {
        return item !== "." && item !== "-";
    });
    if (valideCEP.length !== 8) {
        return { status: false, message: "Informe um CEP válido" };
    }
    cep = valideCEP.reduce((acum, value) => acum + value);
    return { status: true, cep };
}
export function validateDate(date) {
    if (!date.trim()) {
        return { status: false, message: "Informe uma data" };
    }
    if (date.length < 10) {
        return { status: false, message: "Informe uma data no formato válido" };
    }
    const dateFormat = date.split("/").reverse().join("-") + "T20:00:00.000Z";

    if (!checkDate(new Date(dateFormat))) {
        return { status: false, message: "Informe uma data válida" };
    }
    return { status: true, dateFormat };
}

function checkDate(date) {
    return date instanceof Date && !isNaN(date);
}

export function validateValue(value) {
    if (!value.trim()) {
        return { status: false, message: "Informe o valor da cobrança" };
    }
    const valueConvert = convertValuesIntoCents(value);
    if (!valueConvert) {
        return { status: false, message: "Este campo deve ser preenchido" };
    }
    return { status: true, valueConvert };
}

export function maskCPF(cpf) {
    let value = cpf;
    value = value.replace(/\D/g, "");
    if (value.length < 5) {
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    } else if (value.length < 7) {
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    } else if (value.length < 10) {
        value = value.replace(/^(\d{3})(\d{3})(\d)/, "$1.$2.$3");
    } else {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
    }
    return value;
}

export function maskCEP(cep) {
    let value = cep;
    value = value.replace(/\D/g, "");
    if (value.length < 5) {
        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    } else if (value.length < 6) {
        value = value.replace(/^(\d{2})(\d{3})/, "$1.$2");
    } else {
        value = value.replace(/^(\d{2})(\d{3})(\d)/, "$1.$2-$3");
    }
    return value;
}
export function maskTelephone(telephone) {
    let value = telephone;
    value = value.replace(/\D/g, "");
    if (value.length < 7) {
        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    } else if (value.length < 11) {
        value = value.replace(/^(\d{2})(\d{4})(\d)/, "($1) $2-$3");
    } else if (value.length < 13) {
        value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d)/, "($1) $2 $3-$4");
    } else {
        value = value.replace(
            /^(\d{2})(\d{2})(\d{1})(\d{4})(\d)/,
            "+$1 ($2) $3 $4-$5"
        );
    }
    return value;
}

export function maskValues(value) {
    let valueTreat = `R$${(value / 100).toFixed(2).replace(".", ",")}`;
    valueTreat = valueTreat.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return valueTreat;
}
export function treatValuesInputStrings(e) {
    const caracter = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "¨",
        "&",
        "*",
        "(",
        ")",
        "-",
        "_",
        "=",
        "+",
        ".",
        ",",
        ":",
        "<",
        ">",
        "|",
        "?",
        "{",
        "}",
        "[",
        "]",
        "/",
        "  ",
        "ª",
        "º",
        "°",
        '"',
        "'",
    ];
    let value = e;
    let isSpecialCaracter = false;
    for (let item of caracter) {
        if (value.includes(item)) {
            isSpecialCaracter = true;
            break;
        }
    }
    value = value.replace(/\d/g, "");
    isSpecialCaracter ? (value = value.slice(0, value.length - 1)) : "";
    e = value;
    return e;
}

export function treatDateInput(e) {
    let value = e.target.value;
    e.target.maxLength = 10;
    if (e.target.value.length < 6) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    } else {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{2})(\d)/, "$1/$2/$3");
    }
    e.target.value = value;

    return e.target.value;
}

export function treatValuesInput(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    value = "R$ " + value;
    e.target.value = value;

    return e.target.value;
}

export function compareDateStatus(date) {
    const status = new Date(date) < new Date() ? "Vencida" : "Pendente";
    return status;
}

export function formatDateLong(date) {
    const formatterDate = Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
    });
    return formatterDate.format(new Date(date));
}

export function orderbyArrayName(array, type) {
    let arrayOrdebay;
    if (type) {
        arrayOrdebay = array.sort((a, b) => {
            return a.nome.localeCompare(b.nome);
        });
    } else {
        arrayOrdebay = array.sort((a, b) => {
            return b.nome.localeCompare(a.nome);
        });
    }
    return arrayOrdebay;
}

export function orderbyArrayId(array, type) {
    let arrayOrdebay;
    if (type) {
        arrayOrdebay = array.sort((a, b) => {
            return a.id - b.id;
        });
    } else {
        arrayOrdebay = array.sort((a, b) => {
            return b.id - a.id;
        });
    }
    return arrayOrdebay;
}

export function formatName(name) {
    let fullname = name.trim().split(" ");
    fullname = fullname.map((name) => {
        return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
    });
    fullname = fullname.filter((element) => {
        return element != "";
    });
    name = fullname.join(" ");
    return name;
}

export function convertValuesIntoCents(value) {
    const valueTreat = value.split("");

    let valueNumber = valueTreat.filter((value) => {
        if (Number(value) || value === "0" || value === ",") return value;
    });
    if (!valueNumber.length) return false;

    let valueCents = valueNumber.reduce((acum, value) => acum + value);
    valueCents = valueCents.replace(",", ".");
    valueCents = Number(valueCents * 100);
    return valueCents;
}

export function orderbyArrayDate(array, type) {
    let arrayOrderby;
    if (type) {
        arrayOrderby = array.sort((a, b) => {
            return a.vencimento.localeCompare(b.vencimento);
        });
    } else {
        arrayOrderby = array.sort((a, b) => {
            return b.vencimento.localeCompare(a.vencimento);
        });
    }
    return arrayOrderby;
}
export function verifyStatusClient(client, charges, type) {
    let arrayOrderby;
    if (type) {
        arrayOrderby = array.sort((a, b) => {
            return a.vencimento.localeCompare(b.vencimento);
        });
    } else {
        arrayOrderby = array.sort((a, b) => {
            return b.vencimento.localeCompare(a.vencimento);
        });
    }
    return arrayOrderby;
}

export function editDataArray(array, id, data) {
    let localArray = [...array];
    let localArrayFind = localArray.findIndex((element) => {
        return element.id === id
    });
    localArray.splice(localArrayFind, 1, data);
    return localArray;
}