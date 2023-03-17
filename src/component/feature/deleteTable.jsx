import {Form, Input, InputNumber, Table} from 'antd';
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
const DeleteTable = (props) => {
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
      width: '25%',
    },
    {
      title: 'password',
      dataIndex: 'password',
      width: '25%'
    },
    {
      title: 'roleName',
      dataIndex: 'roleName',
      width: '15%'
    },
    {
      title: 'deletedAt',
      dataIndex: 'deletedAt',
      width: '15%'
    },
  ];
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
            columns={columns}
            rowKey={data=>data.username}
            rowClassName="editable-row"
            pagination={false}
        />
      </Form>
  );
};
export default DeleteTable;
