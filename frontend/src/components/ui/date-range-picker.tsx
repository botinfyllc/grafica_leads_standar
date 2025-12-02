'use client';

import React, { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Props = {
  value?: DateRange | undefined;
  onChange?: (range: DateRange | undefined) => void;
};

export default function DateRangePicker({ value, onChange }: Props) {
  const [range, setRange] = useState<DateRange | undefined>(value);

  useEffect(() => {
    setRange(value);
  }, [value]);

  function handleSelect(r: DateRange | undefined) {
    setRange(r);
    onChange?.(r);
  }

  const from = range?.from ? range.from.toLocaleDateString() : '';
  const to = range?.to ? range.to.toLocaleDateString() : '';

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Rango de fechas</label>
      <div className="bg-white border rounded-md p-2">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={handleSelect}
          weekStartsOn={1}
        />
        <div className="mt-2 text-sm text-gray-500">
          {from || to ? (
            <span>
              {from} {to ? ` a ${to}` : ''}
            </span>
          ) : (
            <span>Selecciona un rango</span>
          )}
        </div>
      </div>
    </div>
  );
}
