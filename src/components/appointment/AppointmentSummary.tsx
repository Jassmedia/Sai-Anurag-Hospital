import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./Appointment.module.css";

interface AppointmentSummaryProps {
  doctorName?: string;
  specialtyName?: string;
  /** Display date, e.g. "Thu, 15 Oct 2026". */
  date?: string;
  /** Display time, e.g. "10:30 AM". */
  time?: string;
  patientName?: string;
}

/** Live summary of what the patient is requesting. */
export function AppointmentSummary({
  doctorName,
  specialtyName,
  date,
  time,
  patientName,
}: AppointmentSummaryProps) {
  const rows: { icon: IconName; label: string; value?: string; empty: string; strong?: boolean }[] = [
    { icon: "stethoscope", label: "Doctor", value: doctorName, empty: "Not selected", strong: true },
    { icon: "heart-pulse", label: "Specialty", value: specialtyName, empty: "—" },
    { icon: "calendar", label: "Date", value: date, empty: "Not selected", strong: true },
    { icon: "clock", label: "Time", value: time, empty: "Not selected", strong: true },
    { icon: "user", label: "Patient", value: patientName?.trim(), empty: "Not entered" },
  ];

  return (
    <div className={styles.summary}>
      <div className={styles.summaryHead}>
        <span className={styles.summaryIcon}>
          <Icon name="calendar-check" size={22} />
        </span>
        <h2 className={styles.summaryTitle}>Appointment Summary</h2>
      </div>
      <dl className={styles.summaryList}>
        {rows.map((row) => (
          <div key={row.label} className={styles.summaryRow}>
            <dt>
              <Icon name={row.icon} size={16} />
              {row.label}
            </dt>
            <dd className={row.strong && row.value ? styles.summaryStrong : undefined}>
              {row.value || <span className={styles.summaryEmpty}>{row.empty}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
