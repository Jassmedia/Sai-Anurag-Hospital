import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { highlights } from "@/data/highlights";
import styles from "./WhyChooseUs.module.css";

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="section section--soft"
      aria-labelledby="why-title"
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionHeader
            id="why-title"
            eyebrow="Why Sai Anurag"
            title="Why Choose Sai Anurag"
            description="We aim to make every visit comfortable, clear and caring — from your first call to your follow-up."
            align="left"
          />
        </div>

        {highlights.map((item, i) => (
          <article key={item.title} className={styles.item}>
            <div className={styles.itemTop}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={24} />
              </span>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
