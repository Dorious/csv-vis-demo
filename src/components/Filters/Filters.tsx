import { Button } from 'antd'
import { useFormik } from 'formik';
import React, { ReactElement, useEffect, useMemo, useRef } from 'react'
import { useHistory } from 'react-router';
import queryString from 'query-string';
import { isEmpty } from 'lodash';

import { useAppState } from '../../overmind';
import { ChartFilter } from '../../models/filters';
import Filter from './Filter';

export default function Filters(): ReactElement {
  const history = useHistory();
  const form = useRef<HTMLFormElement>(null);
  const { filters } = useAppState();
  const filterValues = Object.values(filters).map(filter => filter.value);
  
  const initialValues = useMemo(() => {
    const values : any = {};
    Object.keys(filters).forEach(key => values[key] = filters[key].value);
    return values;
  }, [filters]);
  
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      history.push(`/?${queryString.stringify(values, {arrayFormat: 'bracket'})}`);
    }
  });

  const disabled = JSON.stringify(filterValues) === JSON.stringify(Object.values(formik.values));

  const onApply = () => {
    formik.submitForm();
  }

  const onChange = (name : string, value : Array<any>) => {
    formik.setFieldValue(name, value);
  };

  // On router change refresh formik values
  useEffect(() => {
    formik.setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <section role="contentinfo" className="Filters" arial-label="Filter dimension values">
      {!isEmpty(filters) ?
        <form onSubmit={formik.handleSubmit} ref={form}>
          <h2>Filter dimension values</h2>

          {Object.keys(filters).map(key => {
            const value = formik.values[key];
            const { label, values: filterValues, value: currentValues } = filters[key] as ChartFilter;

            return (
              <Filter 
                key={key} 
                name={key}
                label={label}
                values={filterValues} 
                value={value}
                currentValues={currentValues}
                onChange={onChange}
                onReload={() => {
                  formik.setFieldValue(key, filters[key].value);
                }}
                onContrast={() => {
                  formik.setFieldValue(key, []);
                }}
              />
            )
          })}

          <div className="Filters-buttons">
            <Button type="primary" disabled={disabled} onClick={onApply}>Apply</Button>
          </div>
        </form> : <></>}
    </section>
  )
}
