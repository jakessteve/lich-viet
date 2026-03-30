/**
 * LunarEventManager — Modal for managing lunar calendar events
 *
 * Allows users to create, view, edit, and delete lunar-date-based events
 * like birthdays and death anniversaries.
 */

import { useState } from 'react';
import { useLunarEvents, type LunarEvent } from '../../hooks/useLunarEvents';
import '../../styles/lunar-event.css';

const CATEGORY_LABELS: Record<LunarEvent['category'], { label: string; icon: string }> = {
  birthday: { label: 'Sinh nhật', icon: '🎂' },
  anniversary: { label: 'Giỗ', icon: '🕯️' },
  custom: { label: 'Tùy chỉnh', icon: '📌' },
};

interface LunarEventManagerProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-fill date when creating from calendar click */
  initialLunarDay?: number;
  initialLunarMonth?: number;
}

export default function LunarEventManager({
  isOpen,
  onClose,
  initialLunarDay,
  initialLunarMonth,
}: LunarEventManagerProps) {
  const { events: _events, upcomingEvents, addEvent, deleteEvent } = useLunarEvents();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [lunarDay, setLunarDay] = useState(initialLunarDay || 1);
  const [lunarMonth, setLunarMonth] = useState(initialLunarMonth || 1);
  const [category, setCategory] = useState<LunarEvent['category']>('birthday');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addEvent({
      title: title.trim(),
      lunarDay,
      lunarMonth,
      category,
      note: note.trim() || undefined,
    });
    setTitle('');
    setNote('');
    setShowForm(false);
  };

  return (
    <div
      className="lunar-event-overlay"
      onClick={onClose}
      onKeyDown={e => { if (e.key === 'Escape' || e.key === 'Enter') onClose(); }}
      role="button"
      tabIndex={0}
      aria-label="Đóng modal"
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="lunar-event-modal"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => { if (e.key === 'Escape') onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lunar-modal-title"
      >
        {/* Header */}
        <div className="lunar-event-header">
          <h3 id="lunar-modal-title">📅 Sự kiện Âm lịch</h3>
          <button className="lunar-event-close" onClick={onClose} aria-label="Đóng">
            <span className="material-icons-round" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Event List */}
        <div className="lunar-event-list">
          {upcomingEvents.length === 0 ? (
            <div className="lunar-event-empty">
              <span className="material-icons-round" style={{ fontSize: 48, opacity: 0.3 }}>event_note</span>
              <p>Chưa có sự kiện nào</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                Thêm sinh nhật, ngày giỗ hoặc sự kiện âm lịch quan trọng
              </p>
            </div>
          ) : (
            upcomingEvents.map(ev => (
              <div key={ev.id} className="lunar-event-item">
                <span className="lunar-event-icon">
                  {CATEGORY_LABELS[ev.category].icon}
                </span>
                <div className="lunar-event-info">
                  <strong>{ev.title}</strong>
                  <span className="lunar-event-date">
                    {ev.lunarDay}/{ev.lunarMonth} Âm lịch · {CATEGORY_LABELS[ev.category].label}
                  </span>
                  {ev.note && <span className="lunar-event-note">{ev.note}</span>}
                </div>
                <button
                  className="lunar-event-delete"
                  onClick={() => deleteEvent(ev.id)}
                  title="Xóa"
                >
                  <span className="material-icons-round">delete_outline</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add Form */}
        {showForm ? (
          <form className="lunar-event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tên sự kiện..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              maxLength={100}
            />
            <div className="lunar-event-form-row">
              <label>
                Ngày:
                <input
                  type="number"
                  min={1} max={30}
                  value={lunarDay}
                  onChange={e => setLunarDay(Number(e.target.value))}
                />
              </label>
              <label>
                Tháng:
                <input
                  type="number"
                  min={1} max={12}
                  value={lunarMonth}
                  onChange={e => setLunarMonth(Number(e.target.value))}
                />
              </label>
              <label>
                Loại:
                <select value={category} onChange={e => setCategory(e.target.value as LunarEvent['category'])}>
                  <option value="birthday">🎂 Sinh nhật</option>
                  <option value="anniversary">🕯️ Giỗ</option>
                  <option value="custom">📌 Tùy chỉnh</option>
                </select>
              </label>
            </div>
            <input
              type="text"
              placeholder="Ghi chú (không bắt buộc)..."
              value={note}
              onChange={e => setNote(e.target.value)}
              maxLength={200}
            />
            <div className="lunar-event-form-actions">
              <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
              <button type="submit" className="lunar-event-submit">Thêm</button>
            </div>
          </form>
        ) : (
          <button className="lunar-event-add-btn" onClick={() => setShowForm(true)}>
            <span className="material-icons-round">add</span>
            Thêm sự kiện
          </button>
        )}
      </div>
    </div>
  );
}
