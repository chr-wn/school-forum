import React from "react";
import CreateCategoryModal from "../CreateCategoryModal";
import { Widget, WidgetBody, WidgetTitle } from "../ui/Widget";

interface AdminPanelProps {}

const AdminPanel: React.FC<AdminPanelProps> = ({}) => {
  return (
    <Widget>
      <WidgetTitle>Admin Panel</WidgetTitle>
      <WidgetBody>
        <CreateCategoryModal />
      </WidgetBody>
    </Widget>
  );
};

export default AdminPanel;
