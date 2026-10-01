import { Icon, type IconName } from "@/components/ui/Icon";
import fieldStyles from "@/components/ui/Form.module.css";
import type { TimeSlot } from "@/types";
import styles from "./Appointment.module.css";

interface TimeSlotPickerProps {
  /** null until a doctor and a valid date are chosen. */
  slots: TimeSlot[] | null;
  loading: boolean;
  value: string;
  onChange: (time: string) => void;
  error?: string;
  /** Shown while slots is null, e.g. "Select a doctor to see available times." */
  prompt: string;
}

function sessionIcon(label: string): IconName {
  const l = label.toLowerCase();
  if (l.includes("morning")) return "sun";
  if (l.includes("evening") || l.includes("afternoon")) return "sunset";
  return "clock";
}

/** Groups slots by session while keeping their order. */
function groupBySession(slots: TimeSlot[]) {
  const groups: { session: string; slots: TimeSlot[] }[] = [];
  for (const slot of slots) {
    const group = groups.find((g) => g.session === slot.session);
    if (group) group.slots.push(slot);
    else groups.push({ session: slot.session, slots: [slot] });
  }
  return groups;
}

export const timeInputId = (time: string) => `appt-time-${time.replace(":", "")}`;

export function TimeSlotPicker({ slots, loading, value, onChange, error, prompt }: TimeSlotPickerProps) {
  const labelId = "appt-time-label";
  const errorId = "appt-time-error";

  let body;
  if (loading) {
    body = <p className={styles.slotMessage}>Loading available times…</p>;
  } else if (!slots) {
    body = (
      <p className={styles.slotMessage}>
        <Icon name="clock" size={18} /> {prompt}
      </p>
    );
  } else if (slots.length === 0) {
    body = (
      <p className={styles.slotMessage}>
        <Icon name="info" size={18} /> No times are available on this date. Please choose another date.
      </p>
    );
  } else {
    body = groupBySession(slots).map((group) => (
      <div key={group.session} className={styles.session}>
        <p className={styles.sessionLabel}>
          <Icon name={sessionIcon(group.session)} size={16} /> {group.session}
        </p>
        <div className={styles.slotGrid}>
          {group.slots.map((slot) => {
            const checked = value === slot.time;
            return (
              <label
                key={slot.time}
                className={`${styles.slot} ${checked ? styles.slotChecked : ""} ${
                  slot.available ? "" : styles.slotDisabled
                }`}
              >
                <input
                  type="radio"
                  name="time"
                  id={timeInputId(slot.time)}
                  value={slot.time}
                  checked={checked}
                  disabled={!slot.available}
                  onChange={() => onChange(slot.time)}
                  className={styles.radioInput}
                />
                {slot.label}
              </label>
            );
          })}
        </div>
      </div>
    ));
  }

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
      aria-required="true"
      className={styles.timeGroup}
    >
      <p id={labelId} className={fieldStyles.label}>
        Preferred Time <span className={fieldStyles.required} aria-hidden="true">*</span>
      </p>
      {body}
      {error ? (
        <p id={errorId} className={fieldStyles.error}>
          <Icon name="alert" size={15} /> {error}
        </p>
      ) : null}
    </div>
  );
}
