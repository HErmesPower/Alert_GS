import axios from 'axios';

// ATENÇÃO: Substitua o IP abaixo pelo endereço IPv4 do SEU computador!
const SEU_IP_AQUI = 'localhost'; 

const api = axios.create({
  /**
   * Usamos o IP da sua máquina na rede local para que o
   * aplicativo no celular/emulador consiga encontrar o seu back-end.
   */
  baseURL: `http://${SEU_IP_AQUI}:8080/api/enchente`
});

export default api;