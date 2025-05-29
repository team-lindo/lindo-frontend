// 📁 components/FilterPanel.jsx
import React from 'react';
import { Tag } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const FilterPanel = ({ filters, toggleFilter, setFilterModalVisible }) => {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
      <Tag icon={<FilterOutlined />} onClick={() => setFilterModalVisible(true)} style={{ cursor: 'pointer' }}>
        필터
      </Tag>

      {/* 성별 필터 */}
      <Tag.CheckableTag
        checked={filters.gender.includes('male')}
        onChange={() => toggleFilter('gender', 'male')}
      >
        남
      </Tag.CheckableTag>
      <Tag.CheckableTag
        checked={filters.gender.includes('female')}
        onChange={() => toggleFilter('gender', 'female')}
      >
        여
      </Tag.CheckableTag>

      {/* 스타일 필터 */}
      {["미니멀", "이지캐주얼", "비즈니스캐주얼", "아메카지", "스트릿", "시티보이", "원마일웨어"].map((style) => (
        <Tag.CheckableTag
          key={style}
          checked={filters.style.includes(style)}
          onChange={() => toggleFilter('style', style)}
        >
          {style}
        </Tag.CheckableTag>
      ))}
    </div>
  );
};

export default FilterPanel;
