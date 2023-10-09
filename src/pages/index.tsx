import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'antd';

const Index: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row justify="center" gutter={16}>
        <Col span={8}>
          <Link href="/motion">
            <Card title="Test 1" bordered={false} style={{ width: 300 }}>
              <p>{t('Layout & Style')}</p>
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Card title="Test 2" bordered={false} style={{ width: 300 }}>
            <p>{t('Connect API')}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Link href="/formTable">
            <Card title="Test 3" bordered={false} style={{ width: 300 }}>
              <p>{t('Form & Table')}</p>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default Index;
