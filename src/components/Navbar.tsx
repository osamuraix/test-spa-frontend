import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

const Form: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  let content;

  switch (router.pathname) {
    case '/motion':
      content = (
        <div>
          <h1>{t('Motion Page')}</h1>
          <Link href="/">
            <Button>{t('Go to Main')}</Button>
          </Link>
        </div>
      );
      break;

    case '/formTable':
      content = (
        <div>
          <h1>{t('Form Page')}</h1>
          <Link href="/">
            <Button>{t('Go to Main')}</Button>
          </Link>
        </div>
      );
      break;
  }

  return content;
};

export default Form;
