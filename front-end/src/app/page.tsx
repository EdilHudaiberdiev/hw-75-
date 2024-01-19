'use client';
import styles from './page.module.css'
import axiosApi from "@/axiosApi";
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Alert, Button, CircularProgress, TextField} from "@mui/material";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    decode: '',
    encode: '',
    password: '',
  });

  const encodeMessageReq  = useMutation( {
    mutationFn: async (formData: {[key: string]: string}) => {
      if (formData.password.trim().length > 0 && formData.encode.trim().length > 0) {
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
        setError(false);
      } else {
        setError(true);
      }
    }
  });

  const decodeMessageReq  = useMutation( {
    mutationFn: async (formData: {[key: string]: string}) => {

      if (formData.password.trim().length > 0 && formData.decode.trim().length > 0) {
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
        setError(false);
      } else {
        setError(true);
      }

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
      {loading ? <CircularProgress/> :

          <form>
            <TextField
                label="Encode"
                variant="filled"
                name="encode"
                value={form.encode}
                onChange={changeForm}
            />

            <Button
                variant="contained"
                type="button"
                disabled={form.decode.trim().length > 0}
                onClick={() => handleClick('encode')}
            >Encode</Button>

            <hr/>
            {error ? <Alert severity="error">Password must be field. Also text filed must be field</Alert> : null}
            <TextField
                variant="standard"
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={changeForm}
            />

            <hr/>
            <TextField
                label="Decode"
                variant="filled"
                name="decode"
                value={form.decode}
                onChange={changeForm}
            />
            <Button
                disabled={form.decode.trim().length === 0}
                variant="contained"
                type="button"
                onClick={() => handleClick('decode')}
            >Decode</Button>
          </form>
      }

    </main>
  )
};

export default Home;
