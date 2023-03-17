import { render,screen } from '@testing-library/react';
import UserTable from "./userTable";


it('should render all userdata as needed', () => {
  // jest.mock('@/service', () => ({
  //   getUsers: jest.fn(),
  // }));

  //when
  render(<UserTable />);

  //then
  const columnTitle = screen.getByText("username");
  expect(columnTitle).toBeInTheDocument();
});
