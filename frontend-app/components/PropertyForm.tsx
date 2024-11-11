'use client';

import { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { Property, PROPERTY_TYPES } from '../types/property';

interface PropertyFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: Property) => Promise<void>;
  initialValues?: Property | null;
  loading?: boolean;
}

const PropertyForm = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  loading
}: PropertyFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      title={initialValues ? 'Edit Property' : 'Add Property'}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ is_available: true }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            min={0}
          />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="bedrooms"
            label="Bedrooms"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="bathrooms"
            label="Bathrooms"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="square_feet"
            label="Square Feet"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/,*/g, '')}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="zip_code"
            label="ZIP Code"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="property_type"
            label="Property Type"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Select options={PROPERTY_TYPES} />
          </Form.Item>

          <Form.Item
            name="is_available"
            label="Availability"
            style={{ flex: 1 }}
          >
            <Select
              options={[
                { value: true, label: 'Available' },
                { value: false, label: 'Not Available' },
              ]}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default PropertyForm; 