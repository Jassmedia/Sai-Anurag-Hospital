import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutPoints } from "@/data/highlights";
import { aboutPhotos, type SitePhoto } from "@/data/images";
import styles from "./About.module.css";

const tiles: { icon: IconName; label: string; photo: SitePhoto; className: string; sizes: string }[] = [
  {
    icon: "venus",
    label: "Women",
    photo: aboutPhotos.women,
    className: styles.tileWomen,
    sizes: "(min-width: 960px) 280px, 50vw",
  },
  {
    icon: "baby",
    label: "Children",
    photo: aboutPhotos.children,
    className: styles.tileChildren,
    sizes: "(min-width: 960px) 280px, 50vw",
  },
  {
    icon: "users",
    label: "Families",
    photo: aboutPhotos.families,
    className: styles.tileFamilies,
    sizes: "(min-width: 960px) 560px, 100vw",
  },
];

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        {/* Decorative visual. Photos are set in src/data/images.ts. */}
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.mosaic}>
            {tiles.map((tile) => (
              <div key={tile.label} className={`${styles.tile} ${tile.className}`}>
                <Image
                  src={tile.photo.src}
                  alt=""
                  fill
                  sizes={tile.sizes}
                  className={styles.tileImage}
                  style={{ objectPosition: tile.photo.position }}
                />
                <span className={styles.tileTag}>
                  <Icon name={tile.icon} size={16} strokeWidth={2} />
                  {tile.label}
                </span>
              </div>
            ))}
          </div>
          <figure className={styles.quote}>
            <Icon name="heart" size={20} className={styles.quoteIcon} />
            <blockquote>
              Every patient deserves to be heard, understood and cared for.
            </blockquote>
          </figure>
        </div>

        <div className={styles.content}>
          <SectionHeader
            id="about-title"
            eyebrow="About Sai Anurag"
            title="Care that puts you and your family first"
            align="left"
          />

          <div className={styles.copy}>
            <p>
              At Sai Anurag, we believe good healthcare begins with listening.
              Our doctors take the time to understand each patient&rsquo;s
              needs and guide them with clarity, kindness and respect.
            </p>
            <p>
              With doctors in obstetrics &amp; gynaecology, general surgery and
              family medicine, and paediatrics, we care for women, children and
              families at every stage of life — in a comfortable, welcoming
              setting.
            </p>
          </div>

          <ul className={styles.points}>
            {aboutPoints.map((point) => (
              <li key={point}>
                <span className={styles.check} aria-hidden="true">
                  <Icon name="check" size={14} strokeWidth={2.6} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <ButtonLink href="/#specialties" variant="secondary" icon="arrow-right">
            Explore Our Specialties
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
