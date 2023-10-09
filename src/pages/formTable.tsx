import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Col, Row, Form, Input, Select, Radio, DatePicker, Table, Checkbox, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store';
import { addOrUpdateUser, removeUser, loadUsersFromLocalStorage } from '@/store/reducers/userSlice';

import styles from '../styles/app.module.css'

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  phone: string;
  nation: string;
}

const FormTable: React.FC = () => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.userSlice);
  const [usersState, setUsersState] = useState<any>([]);

  useEffect(() => {
    dispatch(loadUsersFromLocalStorage());
  }, []);

  useEffect(() => {
    setUsersState(users)
  }, [users]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="81">+81</Option>
        <Option value="66">+66</Option>
      </Select>
    </Form.Item>
  );

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    const birthDay = values.birthDay.toISOString().slice(0, 10)
    const idCard = values.idCard.join("-");

    values.birthDay = birthDay;
    values.idCard = idCard;
    values.key = values.key ? values.key : usersState[usersState.length - 1]?.key + 1 || 1;

    dispatch(addOrUpdateUser(values));
    dispatch(loadUsersFromLocalStorage());
    onReset();
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: t('Name'),
      dataIndex: 'name',
    },
    {
      title: t('Gender'),
      dataIndex: 'gender',
    },
    {
      title: t('Mobile Phone'),
      dataIndex: 'phone',
    },
    {
      title: t('Nation'),
      dataIndex: 'nation',
    },
    {
      title: t('Manage'),
      dataIndex: 'key',
      render: (text, record: any) => (
        <div>
          <Button type="primary" onClick={() => handleEditRecord(record.key)}>
            {t('Edit record')}
          </Button>
          <Button type="primary" danger onClick={() => handleDeleteRecord(record.key)}>
            {t('Delete record')}
          </Button>
        </div>
      ),
    },
  ];

  const handleEditRecord = (key: number) => {
    const data = usersState.find((e: any) => e.key === key)
    const fieldsData = {
      ...data,
      birthDay: dayjs(data.birthDay),
      idCard: data.idCard.split('-')
    };

    form.setFieldsValue(fieldsData);
  };

  const handleDeleteRecord = (key: number) => {
    setOpenDeleteModal(true)
    setSelectedRowKeys([key]);
  };

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleSelectAll = (e: any) => {
    const { checked } = e.target;
    setSelectAllChecked(checked);
    if (checked) {
      const allRowKeys = usersState.map((user: any) => user.key);
      setSelectedRowKeys(allRowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleDeleteSelect = (e: any) => {
    start();

    dispatch(removeUser(selectedRowKeys));
    dispatch(loadUsersFromLocalStorage());

    const { checked } = e.target;
    setSelectAllChecked(checked);
    setOpenDeleteModal(false);
  };

  const handleModalClose = () => {
    setOpenDeleteModal(false);
    setSelectedRowKeys([]);
  }

  return (
    <>
      <section className={styles.formBox}>
        <Form
          form={form}
          name='user-form'
          onFinish={onFinish}
        >
          <Form.Item>
            <Row>
              <Col>
                <Form.Item
                  label={t('Title')}
                  name="title"
                  rules={[{ required: true, message: 'Title is required' }]}
                >
                  <Select placeholder={t('Please Select')}>
                    <Option value={'Mr.'}>{t('Mr.')}</Option>
                    <Option value={'Mrs.'}>{t('Mrs.')}</Option>
                    <Option value={'Ms.'}>{t('Ms.')}</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={t('Name')} style={{ marginLeft: '15px' }}
                  name="name"
                  rules={[{ required: true, message: 'Name is required' }]}
                >
                  <Input style={{ width: 300 }} placeholder="" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={t('Surname')} style={{ marginLeft: '15px' }}
                  name="surname"
                  rules={[{ required: true, message: 'Surname is required' }]}
                >
                  <Input style={{ width: 300 }} placeholder="" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  label={t('Birth day')}
                  name="birthDay"
                  rules={[{ required: true, message: 'Birth day is required' }]}
                >
                  <DatePicker format={'YYYY/MM/DD'} placeholder={t('Please Select')} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label={t('Nation')} style={{ marginLeft: '15px' }}
                  name="nation"
                  rules={[{ required: true, message: 'Nation is required' }]}
                >
                  <Select placeholder={t('Please Select')}>
                    <Option value="Japan">Japan</Option>
                    <Option value="Thailand">Thailand</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item label={t('ID Card')}>
                  <Form.Item
                    name={['idCard', 0]}
                    noStyle
                    rules={[{ required: true, message: 'ID Card is required' }]}
                  >
                    <Input maxLength={1} style={{ width: 40 }} placeholder="" />
                  </Form.Item>
                  <span style={{ padding: '0 10px' }}>-</span>
                  <Form.Item
                    name={['idCard', 1]}
                    noStyle
                    rules={[{ required: true, message: 'ID Card is required' }]}
                  >
                    <Input maxLength={4} style={{ width: 70 }} placeholder="" />
                  </Form.Item>
                  <span style={{ padding: '0 10px' }}>-</span>
                  <Form.Item
                    name={['idCard', 2]}
                    noStyle
                    rules={[{ required: true, message: 'ID Card is required' }]}
                  >
                    <Input maxLength={5} style={{ width: 80 }} placeholder="" />
                  </Form.Item>
                  <span style={{ padding: '0 10px' }}>-</span>
                  <Form.Item
                    name={['idCard', 3]}
                    noStyle
                    rules={[{ required: true, message: 'ID Card is required' }]}
                  >
                    <Input maxLength={2} style={{ width: 50 }} placeholder="" />
                  </Form.Item>
                  <span style={{ padding: '0 10px' }}>-</span>
                  <Form.Item
                    name={['idCard', 4]}
                    noStyle
                    rules={[{ required: true, message: 'ID Card is required' }]}
                  >
                    <Input maxLength={1} style={{ width: 40 }} placeholder="" />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  label={t('Gender')}
                  name="gender"
                  rules={[{ required: true, message: 'Username is required' }]}
                >
                  <Radio.Group>
                    <Radio value="Male">{t('Male')}</Radio>
                    <Radio value="Female">{t('Female')}</Radio>
                    <Radio value="Other">{t('Other')}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  label={t('Mobile Phone')}
                  name="phone"
                  rules={[{ required: true, message: 'Mobile Phone is required' }]}
                >
                  <Input addonBefore={prefixSelector} style={{ width: 300 }} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item
                  label={t('Passport')}
                  name="passport"
                >
                  <Input style={{ width: 300 }} placeholder="" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={14}>
                <Form.Item
                  label={t('Salary')}
                  name="salary"
                  rules={[{ required: true, message: 'Salary is required' }]}
                >
                  <Input style={{ width: 270 }} placeholder="" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button onClick={onReset}>ล้างข้อมูล</Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">ส่งข้อมูล</Button>

                <Form.Item name="key">
                  <Input type="hidden" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </section>

      <section className={styles.tableBox}>
        <Form>
          <Row>
            <Col>
              <Form.Item name="selectAll">
                <Checkbox checked={selectAllChecked} onChange={handleSelectAll} disabled={!usersState.length}>{t('Select All')}</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" onClick={() => setOpenDeleteModal(true)} disabled={!selectedRowKeys.length} loading={loading}>
                {t('Delete Data')}
              </Button>

              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `${t('Selected')} ${selectedRowKeys.length} ${t('record')}` : ''}
              </span>
            </Col>
          </Row>
        </Form>
        <Table rowSelection={rowSelection} columns={columns} dataSource={usersState} loading={loading} />

        <Modal
          title={t('Confirm Delete')}
          open={openDeleteModal}
          onOk={handleDeleteSelect}
          onCancel={handleModalClose}
        >
          {t('Confirm Message')}
        </Modal>
      </section>
    </>
  );
};

export default FormTable;