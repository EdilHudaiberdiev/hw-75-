'use client';
import styles from './page.module.css'
import axiosApi from "@/axiosApi";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {act} from "react-dom/test-utils";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    decode: '',
    encode: '',
    password: '',
  });

  const encodeMessageReq  = useMutation( {
    mutationFn: async (formData: {[key: string]: string}) => {
      setLoading(true);
      try {
        const response = await axiosApi.post('/encode/' + formData.encode, {password: formData.password});
        setForm((prev) => ({
          ...prev,
          decode: response.data,
          encode: '',
        }));
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    }
  });

  const decodeMessageReq  = useMutation( {
    mutationFn: async (formData: {[key: string]: string}) => {
      setLoading(true);
      try {
        const response = await axiosApi.post('/decode/' + formData.decode, {password: formData.password});
        setForm((prev) => ({
          ...prev,
          encode: response.data,
          decode: '',
        }));
      }catch (e) {
        console.error(e);
      }

      setLoading(false);
    }
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }


  const handleClick = async (action: string) => {

    if (action === 'encode') {
      await encodeMessageReq.mutateAsync(form);
    } else {
      await decodeMessageReq.mutateAsync(form);
    }

  };


  return (
    <main className={styles.main}>
      {loading ? <p>Loading</p> :

          <form>
            <input type="text" name="encode" value={form.encode} onChange={changeForm}/>
            <button type="button" onClick={() => handleClick('encode')}>Encode</button>
            <hr/>
            Password: <input type="password" name="password" value={form.password} onChange={changeForm}/>
            <hr/>
            <input type="text" name="decode" value={form.decode} onChange={changeForm}/>
            <button type="button" onClick={() => handleClick('decode')}>Decode</button>
          </form>
      }

    </main>
  )
};

export default Home;
