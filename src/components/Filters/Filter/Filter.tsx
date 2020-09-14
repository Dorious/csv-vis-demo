import Icon, { ReloadOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { ReactElement, memo } from 'react';

import { ReactComponent as Contrast } from './contrast.svg';

import './Filter.less';

export interface MultipleProps {
  name: string,
  value: Array<string> | string,
  values: Array<string>,
  disabled?: boolean,
  onChange: Function,
}

export function FilterMultiple({ name, value, values, disabled = false, onChange }: MultipleProps): ReactElement {
  return (
    <Select 
      value={value} 
      className="Filter-multiple"
      mode="multiple"
      disabled={disabled}
      onChange={val => onChange(name, val)}
      options={values.map(val => ({ value: val }))}
    />
  )
}

export interface Props {
  name: string,
  label: string,
  value: Array<string>,
  values: Array<string>,
  currentValues: Array<string>,
  onChange: Function,
  onReload: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
  onContrast: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
}

export default memo(function Filter({ name, label, value, values, currentValues, onChange, onReload, onContrast }: Props): ReactElement {
  return (
    <div className="Filter">
      <h3>{label}</h3>
      <div className="Filter-actions">
        <Icon component={Contrast} onClick={onContrast} />
        &nbsp;&nbsp;
        <ReloadOutlined 
          onClick={onReload} 
          style={{opacity: JSON.stringify(currentValues) !== JSON.stringify(value) ? 1 : 0.3 }}
        />
      </div>
      <div className="Filter-input">
        <FilterMultiple name={name} key={value ? value.join(',') : ''} value={value} values={values} onChange={onChange} />
      </div>
    </div>
  )
});
