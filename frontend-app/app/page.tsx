'use client';

import { useState, useEffect, useCallback } from 'react';
import { Layout, Button, message, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Property } from '@/types/property';
import { propertyService } from '@/services/propertyService';
import PropertyForm from '@/components/PropertyForm';
import PropertyTable from '@/components/PropertyTable';

const { Content } = Layout;

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState({
    table: false,
    submit: false,
    delete: new Set<number>(),
  });
  const [messageApi, contextHolder] = message.useMessage();

  const loadProperties = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, table: true }));
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (error) {
      messageApi.error('Failed to load properties');
      console.error('Load error:', error);
    } finally {
      setLoading(prev => ({ ...prev, table: false }));
    }
  }, [messageApi]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleCreate = () => {
    setSelectedProperty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(prev => ({
        ...prev,
        delete: new Set(prev.delete).add(id),
      }));
      await propertyService.delete(id);
      messageApi.success('Property deleted successfully');
      await loadProperties();
    } catch (error) {
      messageApi.error('Failed to delete property');
      console.error('Delete error:', error);
    } finally {
      setLoading(prev => {
        const newDelete = new Set(prev.delete);
        newDelete.delete(id);
        return { ...prev, delete: newDelete };
      });
    }
  };

  const handleSubmit = async (values: Property) => {
    try {
      setLoading(prev => ({ ...prev, submit: true }));
      if (selectedProperty?.id) {
        await propertyService.update(selectedProperty.id, values);
        messageApi.success('Property updated successfully');
      } else {
        await propertyService.create(values);
        messageApi.success('Property created successfully');
      }
      setIsModalOpen(false);
      await loadProperties();
    } catch (error) {
      messageApi.error(
        selectedProperty?.id
          ? 'Failed to update property'
          : 'Failed to create property'
      );
      console.error('Submit error:', error);
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Content style={{ padding: 24 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>Property Management</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
          >
            Add Property
          </Button>
        </div>

        <PropertyTable
          properties={properties}
          loading={loading.table}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleteLoading={loading.delete}
        />

        <PropertyForm
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialValues={selectedProperty}
          loading={loading.submit}
        />
      </Content>
    </Layout>
  );
}
