import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

import { IBreadcrumbsProps } from "./types";

import "./styles.scss";

const Breadcrumbs: FC<IBreadcrumbsProps> = ({items}) => {
  const values = useMemo(() => typeof items === "string" ? items : items.join('; '), [items]);
  const navigate = useNavigate()
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__items">
        {values}
      </div>
      <RiCloseFill className="breadcrumbs__close" onClick={() => navigate(-1)}/>
    </div>
  );
};

export default Breadcrumbs;
