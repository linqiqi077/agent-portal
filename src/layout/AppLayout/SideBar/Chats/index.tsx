'use client';

import { Skeleton } from 'antd';
import classnames from 'classnames';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { useAxiosRequest } from '@/utils/axios';

// import { DEFAULT_CHAT } from '@/utils/constants';
import ChatItem from './Item';
import { useStyles } from './styles';

// const default_chat_obj: any = {
//   id: DEFAULT_CHAT,
//   title: I18N.Chats.index.moRenDuiHua,
//   desc: I18N.Chats.index.duiHuaBaLaBa,
// };

const EMPTY_ITEMS = [1, 2, 3, 4];

const Chats: any = () => {
  const { styles } = useStyles();

  const [{ data }] = useAxiosRequest({
    url: '/kubeagi-apis/chat/conversations',
    method: 'POST',
  });
  const { id } = useParams();
  const list = useMemo(() => {
    const res =
      data?.map((item: any) => ({
        title: item.messages?.[0]?.query,
        desc: item.messages?.[0]?.answer,
        ...item,
      })) || [];
    return res;
  }, [data, id]);

  return (
    <div className={classnames(styles.chats, 'scrollBar')}>
      <link href="/style/yunti-chat.min.css" rel="stylesheet" />
      <div className={styles.content}>
        {data
          ? [
              // default_chat_obj,
              ...list,
            ].map((item: any, idx: number) => <ChatItem data={item} key={item.key + '' + idx} />)
          : EMPTY_ITEMS.map(item => {
              return (
                <Skeleton
                  avatar={{ size: 42 }}
                  className={styles.emptyItem}
                  key={item}
                  paragraph={{
                    rows: 2,
                  }}
                  title={false}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Chats;
