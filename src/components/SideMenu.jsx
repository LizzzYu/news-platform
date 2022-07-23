import clsx from 'clsx';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sideMenuConfig } from '../static/sideMenuConfig';

export default function SideMenu() {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate()
  return (
    <div className="sideMenu-wrapper">
      {sideMenuConfig.map((menu) => (
        <div
          key={menu.id}
          onClick={() => {
            navigate(menu.path)
            setSelected(menu.id)
          }}
          className={clsx('sideMenu-wrapper__sideMenu', {
            'sideMenu-wrapper__sideMenu active': menu.id === selected,
          })}>
          <p>{menu.name}</p>
        </div>
      ))}
    </div>
  );
}
