import {useEffect, useState} from "react";
import {getUsers} from "../../service";
import UserTable from "./userTable";
import DeleteTable from "./deleteTable";

const UserManagement = () => {
  const [notDeletedData, setNotDeletedData] = useState([]);
  const [deletedData, setDeletedData] = useState([]);
  useEffect(() => {
    try {
      getUsers().then((data) => {
        let newData = [];
        data.map((e) => (
            newData.push(Object.assign({}, {
              key: e.id,
              username: e.user_name,
              password: e.password,
              roleName: e.role_name,
              createdAt: e.created_at,
              deleted: e.deleted,
              deletedAt: e.deleted_at
            }))
        ));
        setNotDeletedData(
            newData.filter(e => e.deleted === false && e.deletedAt === null));
        setDeletedData(
            newData.filter(e => e.deleted === true ));
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
      <>
        <UserTable dataSource={notDeletedData}/>
        <DeleteTable dataSource={deletedData}/>
      </>
  )

}
export default UserManagement;
