import {Form, Input, InputNumber, Popconfirm, Table, Typography} from 'antd';
import {useState} from 'react';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
  return (
      <td {...restProps}>
        {editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
            >
              {inputNode}
            </Form.Item>
        ) : (
            children
        )}
      </td>
  );
};
const UserTable = (props) => {
  const [form] = Form.useForm();
  const [notDeletedData, setNotDeletedData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      username: '',
      password: '',
      roleName: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...notDeletedData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setNotDeletedData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setNotDeletedData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
      width: '25%',
      editable: true,
    },
    {
      title: 'password',
      dataIndex: 'password',
      width: '25%',
      editable: true,
    },
    {
      title: 'roleName',
      dataIndex: 'roleName',
      width: '15%',
      editable: true,
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      width: '15%',
      editable: false,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
            <span>
            <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <Typography.Link disabled={editingKey !== ''}
                             onClick={() => edit(record)}>
              Edit
            </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex ,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
      <Form form={form} component={false}>
        <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered={true}
            dataSource={props.dataSource}
            columns={mergedColumns}
            rowKey={data=>data.username}
            rowClassName="editable-row"
            pagination={false}
        />
      </Form>
  );
};
export default UserTable;
