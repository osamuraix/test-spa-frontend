import { Col, Row } from 'antd';
import React, { useState } from 'react';

import styles from '../styles/app.module.css'

const classOptions = [
  styles.square,
  styles.circle,
  styles.ellipse,
  styles.trapezoid,
  styles.rectangle,
  styles.parallelogram,
];

const Motion: React.FC = () => {
  const [currentClassOptions, setCurrentClassOptions] = useState(classOptions);

  const handleNext = () => {
    const updatedArray = [...currentClassOptions];
    const lastItem = updatedArray.pop() || '';
    updatedArray.unshift(lastItem);
    setCurrentClassOptions(updatedArray);
  };

  const handlePrevious = () => {
    const updatedArray = [...currentClassOptions];
    const firstItem = updatedArray.shift() || '';
    updatedArray.push(firstItem);
    setCurrentClassOptions(updatedArray);
  };

  const handleTopToDown = () => {
    const updatedArray = [...currentClassOptions];
    const topItems = updatedArray.slice(0, 3);
    updatedArray.splice(0, 3);
    updatedArray.push(...topItems);
    setCurrentClassOptions(updatedArray);
  };

  const handleDownToTop = () => {
    const updatedArray = [...currentClassOptions];
    const bottomItems = updatedArray.slice(-3);
    updatedArray.splice(-3, 3);
    updatedArray.unshift(...bottomItems);
    setCurrentClassOptions(updatedArray);
  };

  const handleRandom = () => {
    const randomizeArray = [...currentClassOptions].sort(() => 0.5 - Math.random());
    setCurrentClassOptions(randomizeArray);
  };

  return (
    <>
      <Row justify="center">
        <Col lg={6}>
          <div className={styles.motionBox} onClick={handlePrevious}>
            <div className={styles.triangleLeft}></div>

            <div className={styles.motionCardItemDivText}><p className={styles.motionCardItemText}>Move shave</p></div>
          </div>
        </Col>

        <Col lg={12}>
          <Row>
            <Col>
              <div className={styles.motionBox} style={{ width: '600px', padding: '0 15px', justifyContent: 'space-evenly' }}>
                <div className={styles.triangleUp} style={{ margin: '15px' }} onClick={handleTopToDown}></div>
                <div className={styles.triangleDown} style={{ margin: '15px' }} onClick={handleDownToTop}></div>

                <div className={styles.motionCardItemDivText}><p className={styles.motionCardItemText}>Move shave</p></div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={6}>
          <div className={styles.motionBox} onClick={handleNext}>
            <div className={styles.triangleRight}></div>

            <div className={styles.motionCardItemDivText}><p className={styles.motionCardItemText}>Move shave</p></div>
          </div>
        </Col>
      </Row>

      <hr />

      <Row justify="center">
        {currentClassOptions.map((optionClass, index: number) => {
          let colOffset = 0

          switch (index) {
            case 0:
              colOffset = 6
              break;
            case 3:
              colOffset = 2
              break;
          }

          return (
            <Col lg={6} offset={colOffset} key={optionClass}>
              <div className={styles.motionBox} onClick={handleRandom}>
                <div className={optionClass}></div>
              </div>
            </Col>
          )
        })}
      </Row >
    </>
  );
};

export default Motion;
