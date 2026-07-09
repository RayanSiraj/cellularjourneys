import { UserCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  Callout,
  PageHeader,
  SectionHeading,
  Seo,
} from "../components/PageElements";
import {
  boardMembers,
  mission,
  missionActions,
  values,
} from "../data/content";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Cellular Journeys, our mission, vision, values, and Board of Directors."
      />
      <PageHeader
        title="Science education with community purpose."
        intro="Cellular Journeys connects scientific discovery with public understanding, student learning, and community engagement."
      />

      <section className="page-shell section">
        <SectionHeading title="Who We Are" />
        <div className="mt-7 max-w-4xl space-y-5 text-lg leading-8 text-muted">
          <p>
            Cellular Journeys is a nonprofit organization dedicated to
            advancing cancer education, scientific literacy, research
            awareness, and community engagement. We believe that knowledge
            empowers individuals, families, and communities to make informed
            decisions about their health while inspiring the next generation
            of scientists, healthcare professionals, educators, and advocates.
          </p>
          <p>
            Founded by a team of educators, researchers, healthcare
            professionals, and community leaders, Cellular Journeys was created
            to bridge the gap between scientific discovery and public
            understanding. As the home of CancerQuest and other educational
            initiatives, Cellular Journeys works to transform information into
            action.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title="Our Mission" intro={mission} />
            <div className="mt-8 grid gap-3">
              {missionActions.map((item) => (
                <p
                  key={item}
                  className="rounded-lg border-l-4 border-[var(--brand)] bg-[var(--surface-soft)] px-5 py-4 leading-7"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <img
            src="/images/cellular-journeys-science.webp"
            alt=""
            width="1536"
            height="1024"
            loading="lazy"
            className="surface aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      <section className="page-shell section">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface bg-[var(--surface-soft)] p-7 md:p-10">
            <SectionHeading title="Our Vision" />
            <p className="mt-5 text-xl leading-9 text-muted">
              A world where every individual has access to trustworthy health
              information, every student has opportunities to explore science
              and research, and every community is empowered to make informed
              decisions that improve health outcomes.
            </p>
          </div>
          <div>
            <h2 className="display text-3xl font-bold">Our Values</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {values.map((value) => (
                <div key={value} className="surface p-4">
                  <h3 className="font-bold">{value}</h3>
                  <p className="mt-2 text-sm text-muted">
                    Description coming soon.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell section">
          <SectionHeading
            title="Board of Directors"
            intro="The board guides organizational strategy, education, community outreach, and the long-term growth of Cellular Journeys."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {boardMembers.map((member, index) => (
              <article
                key={member.name}
                className={`surface p-6 ${
                  index === 0 ? "md:col-span-2 md:grid md:grid-cols-[auto_1fr] md:gap-7" : ""
                }`}
              >
                {/* TODO(client): replace the neutral avatar with a real board headshot. */}
                <UserCircle
                  size={72}
                  weight="duotone"
                  className="shrink-0 text-[var(--brand)]"
                  aria-label="Headshot not yet provided"
                />
                <div>
                  <h3 className="mt-4 text-xl font-bold md:mt-0">{member.name}</h3>
                  <p className="mt-1 font-bold text-[var(--brand-strong)]">
                    {member.title}
                  </p>
                  <p className="mt-4 leading-7 text-muted">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="page-shell section">
        <Callout
          title="Join Us"
          action={
            <Link className="btn btn-primary" to="/get-involved">
              Get Involved
            </Link>
          }
        >
          Learn. Create. Inspire. Impact.
        </Callout>
      </div>
    </>
  );
}
