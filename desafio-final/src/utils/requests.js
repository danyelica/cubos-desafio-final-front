import api from "../services/api";
import { getItem } from "./storage";

export function getHeaders() {
    const token = getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
}
export async function postLogin(data) {
    const response = await api.post("/login", { ...data });
    return response;
}
export async function postRegister(data) {
    const response = await api.post("/cadastro", { ...data });
    return response;
}
export async function postRegisterClient(data) {
    const headers = getHeaders();
    const response = await api.post("/cliente", { ...data }, { headers });
    return response;
}
export async function patchUser(data) {
    const headers = getHeaders();
    const response = await api.patch("/editar", { ...data }, { headers });
    return response;
}
export async function getUser() {
    const headers = getHeaders();
    const response = await api.get("/usuario", { headers });
    return response;
}
export async function getClient(id) {
    const headers = getHeaders();
    const response = await api.get(`/cliente/${id}`, { headers });
    return response;
}

export async function patchClient(data, id) {
    const headers = getHeaders();
    const response = await api.patch(`/cliente/${id}`, { ...data }, { headers });
    return response;
}

export async function postRegisterCharge(data) {
    const headers = getHeaders();
    const response = await api.post("/cobranca", { ...data }, { headers });
    return response;
}

export async function putEditCharge(id, data) {
    const headers = getHeaders();
    const response = await api.put(`/cobranca/${id}`, { ...data }, { headers });
    return response;
}

export async function deleteCharge(id) {
    const headers = getHeaders();
    const response = await api.delete(`/cobranca/${id}`, { headers });
    return response;
}

export async function getCharges(filter) {
    const headers = getHeaders();
    if (filter) {
        const response = await api.get(`/cobranca${filter}`, { headers });
        return response;
    } else {
        const response = await api.get("/cobranca", { headers });
        return response;
    }
}
export async function getCharge(id) {
    const headers = getHeaders();
    const response = await api.get(`/cobranca/detalhar/${id}`, { headers });
    return response;
}
export async function getClients(filter) {
    const headers = getHeaders();
    if (filter) {
        const response = await api.get(`/cliente${filter}`, { headers });
        return response;
    } else {
        const response = await api.get("/cliente", { headers });
        return response;
    }

}
export async function getClientCharges(id) {
    const headers = getHeaders();
    const response = await api.get(`/cobranca/${id}`, { headers });
    return response;
}
export async function getEmail(email) {
    const response = await api.get(`/email`, {
        params: { email },
    });
    return response;
}
