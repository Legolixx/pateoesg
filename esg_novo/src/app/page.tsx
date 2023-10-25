'use client';
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { makeRequest } from '@/axios';

export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState('');
  const [apiCallMade, setApiCallMade] = useState(false);

  useEffect(() => {
    const info = localStorage.getItem('ESG:user');
    if (!info) {
      return;
    } else {
      const parsedInfo = JSON.parse(info);
      const filial = parsedInfo.ORIGEM;
      setUserInfo(filial);
    }
  }, []);

  useEffect(() => {
    if (userInfo && !apiCallMade) {
      makeRequest.post("auth/getuserinfo", { filial: userInfo })
        .then((res) => {
          localStorage.setItem("ESG:userinfo", JSON.stringify(res.data.userInfo));
          setApiCallMade(true); // Set the flag to indicate that the API call has been made
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo, apiCallMade]);

  useEffect(() => {
    let value = localStorage.getItem('ESG:token');
    if (!value) {
      router.push('/login');
    }
  }, [router]);


  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-100">
      <Header />
      <div className='w-full flex justify-start pt-10'>
        <Sidebar />
      </div>

    </main>
  )
}


