import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Property } from '@/types/property';

interface PropertyTableProps {
  properties: Property[];
  loading: boolean;
  onEdit: (property: Property) => void;
  onDelete: (id: number) => void;
  deleteLoading: Set<number>;
}

const PropertyTable = ({
  properties,
  loading,
  onEdit,
  onDelete,
  deleteLoading,
}: PropertyTableProps) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: Property, b: Property) => a.title.localeCompare(b.title),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toLocaleString()}`,
      sorter: (a: Property, b: Property) => a.price - b.price,
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: any, record: Property) => 
        `${record.city}, ${record.state} ${record.zip_code}`,
    },
    {
      title: 'Type',
      dataIndex: 'property_type',
      key: 'property_type',
    },
    {
      title: 'Status',
      dataIndex: 'is_available',
      key: 'is_available',
      render: (isAvailable: boolean) => (
        <Tag color={isAvailable ? 'green' : 'red'}>
          {isAvailable ? 'Available' : 'Not Available'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Property) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => record.id && onDelete(record.id)}
            loading={record.id && deleteLoading.has(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={properties}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
    />
  );
};

export default PropertyTable; 