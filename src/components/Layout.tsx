import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import LanguageSwitcher from './LanguageSwitcher';
import styles from '../styles/app.module.css'
import { Col, Row } from 'antd';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <header>
        <Row justify={'space-between'}>
          <Col>
            <Navbar />
          </Col>
          <Col>
            <LanguageSwitcher />
          </Col>
        </Row>
      </header>
      <main>
        <Row className={styles.divCenter}>
          <Col>
            {children}
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Layout;
