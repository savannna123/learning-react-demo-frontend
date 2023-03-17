import {Form, Input, InputNumber, Popconfirm, Table, Typography} from 'antd';
import {useEffect, useState} from 'react';
import {getUsers} from "../service";

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    username: `Edward ${i}`,
    password: `????`,
    roleName: `hhhh`,
  });
}

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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
const UserTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  // useEffect(()=>{
  //   try{
  //     const data = getUsers();
  //     setData(data);
  //   }catch (e) {
  //     console.log(e);
  //   }
  //
  // },[]);

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
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
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
      width: '15%',
      editable: true,
    },
    {
      title: 'roleName',
      dataIndex: 'roleName',
      width: '40%',
      editable: true,
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
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
        />
      </Form>
  );
};
export default UserTable;
