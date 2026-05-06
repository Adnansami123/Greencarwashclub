import { Button, Table } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

export default function UsersReport({ item = {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const onChangePageChange = (e) => {
    setCurrentPage(e.current);
    setCurrentPageSize(e.pageSize);
  };

  const HeaderColumns = [
    {
      title: "Sl. No.",
      render: (_, records, index) => (
        <>
          {currentPage === 1
            ? index + 1
            : currentPageSize * (currentPage - 1) + 1}
        </>
      ),
    },

    {
      title: "referral Code",
      dataIndex: "referralCode",
      key: "referralCode",
      sorter: (a, b) => a.pid.localeCompare(b.pid),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: "DOB",
      dataIndex: "doj",
      key: "doj",
      sorter: (a, b) => a.doj.localeCompare(b.doj),
    },

    {
      title: "Created On",
      key: "createdOn",
      dataIndex: "createdOn",
      sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
  ];

  return (
    <>
      <div className="table-responsive">
        <Table
          columns={HeaderColumns}
          dataSource={!!item ? item : null}
          // pagination={false}
          className="ant-border-space"
          onChange={(e) => onChangePageChange(e)}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

UsersReport.propTypes = {
  item: PropTypes.object,
};
