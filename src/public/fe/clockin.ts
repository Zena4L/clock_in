import axios, { AxiosResponse } from 'axios';
import {showAlert} from './alert';

interface clockinI {
  status: string;
  data: {
    message: string;
  };
}
const clockin = async (name: string, phone: string, purpose:string, status:string): Promise<void> => {
  try {
    const res: AxiosResponse<clockinI> = await axios.post(
      'http://localhost:8000/api/clockin',
      {
        name,
        phone,
        purpose,
        status
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res)
    if (res.data.status === "ok") {
        showAlert('success', 'You are clocked IN!');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
    }
  } catch (error:any) {
    console.log(error);
  }
};

export default clockin;