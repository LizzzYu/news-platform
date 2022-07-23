import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import News from './News';

export default function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="tw" element={<News />} />
        <Route path="cn" element={<News />} />
        <Route path="global" element={<News />} />
        <Route path="entertainment" element={<News />} />
        <Route path="business" element={<News />} />
        <Route path="sports" element={<News />} />
        <Route path="technology" element={<News />} />
      </Routes>
    </div>
  );
}
