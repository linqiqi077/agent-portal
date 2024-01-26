'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

import { AUTH_DATA } from '@/utils/constants';

export default function Callback({ data: res }: { data: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const saveAuth = async () => {
    if (res?.data?.errors) {
      console.warn(res?.data?.errors);
      return;
    }
    if (res?.data) {
      localStorage.setItem(
        AUTH_DATA,
        JSON.stringify({
          token: res.data,
        })
      );
      dispatch({
        type: 'SAVE_AUTH_DATA',
        authData: res.data,
      });
      router.push('/chat');
    }
  };
  React.useEffect(() => {
    saveAuth();
  }, []);
  return <> </>;
}
