'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { services } from '../services';

const BookingContext = createContext(null);

const pad = number => String(number).padStart(2, '0');

function localToday(today = new Date()) {
  return [today.getFullYear(), pad(today.getMonth() + 1), pad(today.getDate())].join('-');
}

export function BookingButton({ service, children, ...props }) {
  const openBooking = useContext(BookingContext);

  return (
    <button {...props} type="button" onClick={() => openBooking(service)}>
      {children}
    </button>
  );
}

export function BookingProvider({ children }) {
  const dialog = useRef(null);
  const form = useRef(null);
  const summary = useRef(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (result) summary.current.scrollIntoView({ block: 'nearest' });
  }, [result]);

  function openBooking(service) {
    const { date, service: serviceField } = form.current.elements;
    date.min = localToday();
    clearValidation();
    if (service) serviceField.value = service;
    dialog.current.showModal();
  }

  function clearValidation() {
    const { pet, arrivalTime } = form.current.elements;
    pet.setCustomValidity('');
    arrivalTime.setCustomValidity('');
    setResult('');
  }

  function createSummary(event) {
    event.preventDefault();
    const bookingForm = event.currentTarget;
    const { date, pet, arrivalTime } = bookingForm.elements;
    const now = new Date();
    const today = localToday(now);
    const currentTime = [pad(now.getHours()), pad(now.getMinutes())].join(':');
    date.min = today;
    const petName = pet.value.trim();
    pet.setCustomValidity(petName ? '' : '请输入宠物昵称');
    const timeHasPassed = date.value === today && arrivalTime.value < currentTime;
    arrivalTime.setCustomValidity(timeHasPassed ? '请选择当前或之后的到店时间' : '');
    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);
    const details = [`${petName}（${data.get('species')}）`, data.get('service'), `${date.value} ${arrivalTime.value}`];
    const notes = data.get('notes').trim();
    if (notes) details.push(notes);
    setResult(`已生成预约信息。 ${details.join(' · ')}。此信息尚未发送给门店。`);
  }

  return (
    <BookingContext.Provider value={openBooking}>
      {children}
      <dialog ref={dialog} id="booking-dialog" aria-labelledby="booking-title">
        <div className="dialog-top">
          <h2 id="booking-title">预约洗护</h2>
          <button className="close" type="button" aria-label="关闭预约" onClick={() => dialog.current.close()}>
            ×
          </button>
        </div>
        <p className="note">演示表单，生成的信息仅在当前页面显示。</p>
        <form ref={form} onInput={clearValidation} onSubmit={createSummary}>
          <div className="fields">
            <label>
              宠物昵称
              <input name="pet" required maxLength={30} placeholder="例如 毛球" />
            </label>
            <label>
              宠物类型
              <select name="species" required>
                <option>狗狗</option>
                <option>猫咪</option>
              </select>
            </label>
            <label className="booking-service">
              洗护项目
              <select name="service" required>
                {services.map(({ id, name }) => <option key={id}>{name}</option>)}
              </select>
            </label>
            <label>
              到店日期
              <input type="date" name="date" required />
            </label>
            <label>
              期望到店时间
              <input type="time" name="arrivalTime" required />
            </label>
          </div>
          <label>
            备注
            <input name="notes" maxLength={100} placeholder="选填，例如第一次洗澡" />
          </label>
          <button className="btn btn-dark" type="submit">生成预约信息</button>
        </form>
        <p id="result" ref={summary} role="status" hidden={!result}>{result}</p>
      </dialog>
    </BookingContext.Provider>
  );
}
