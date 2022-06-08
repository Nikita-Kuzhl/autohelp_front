import React, { FC } from "react";
import Category from "../../components/Category";
import MainLayout from "../../layouts/MainLayout";

const CategoryPage: FC = () => {
  return (
    <MainLayout>
      <Category />
    </MainLayout>
  );
};

export default CategoryPage;
