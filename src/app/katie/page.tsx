"use client";

import { useEffect, useRef, useState } from "react";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function KatiePage() {
  const projects = [
    {
      title: "Pinto Bean Pressure Wraps",
      tag: "Research Publication",
      desc: "ABSTRACT: Identifying an optimal treatment method for verruca vulgaris can be a frustrating challenge for clinicians. We describe the use of a pinto bean pressure wrap to induce ischemic change in digital warts. This novel technique provides a low-cost, low-risk, and nearly pain-free home-based treatment option with response rates similar to those of other commonly employed methods.",
      href: "https://pubmed-ncbi-nlm-nih-gov.proxy.lib.uiowa.edu/39787310/",
    },
    {
      title: "Childserve Inpatient Volunteer",
      tag: "Volunteer",
      desc: "I spent the summer of 2026 volunteering in the inpatient unit at Childserve with the children who have mental and/or physical disabilities. Some of my favorite things to do with them included reading them stories, rocking the babies to sleep, playing games, and taking them on walks to the healing gardens! ",
      href: "https://www.childserve.org/",
    },
    {
      title: "Free Mental Health Clinic Patient Examiner",
      tag: "Volunteer",
      desc: "As a return patient examiner, I see returning underinsured/uninsured patients at the Free Mental Health Clinic. I do their initial intake, see the patient with the provider, and write the clinical note. I have always been passionate about mental health, and it has been so rewarding to be able to connect with my community. I have been learning so much from the providers, the patients, and my peers! ",
      href: "https://wellbeing.uiowa.edu/iowa-city-free-mental-health-clinic",
    },
    {
      title: "Dermatology Medical Assistant and Mohs Laboratory Technician",
      tag: "Work",
      desc: "As a dermatology medical assistant before medical school, I assisted with Mohs surgeries, excisions, general dermatology office visits, and procedures. I collected patient histories and chief complaints, scribed, administered local anesthetic, gave test results, collected fungal/bacterial cultures and strep tests, and handled post-op care. As a Mohs laboratory technician, I processed surgically removed skin cancer tissue via frozen sectioning for Mohs micrographic surgery. I learned an unbelievable amount during this experience, and it further reinforced my passion for medicine. ",
      href: "https://forefrontdermatology.com/location/clive-ia-50325/",
    },
    {
      title: "Pediatrics Interest Group Member",
      tag: "Club Involvement",
      desc: "As a member of the Pediatrics Interest Group, I have had the opportunity to attend a variety of panels to expand my knowledge of the field of pediatrics. Some of my favorite sessions I have attended include the following: Looking out for Littles/Child Abuse Pediatrics, Parents of Children with Special Needs, PICU/NICU Pediatrician Panel, etc. Additionally, I help out with the Teddy Bear Clinic, where we teach kids physical exam skills on their stuffed animals. We show them what it looks like to be in a healthcare setting and inspire them.",
      href: "https://www.instagram.com/ccom_pedsinterestgroup/",
    },
    {
      title: "Pending Reseach Projects",
      tag: "Pending Reseach",
      desc: "REVIEW ARTICLE: I am collaborating on a review of the use of cyproheptadine for appetite stimulation in pediatric feeding disorders. RETROSPECTIVE CHART REVIEW: I am collaborating on a retrospective chart review, analyzing the use of swallow studies for a cohort of pediatric patients in the feeding program.",
      href: "#contact",
    },
  ];

  const stats = [
    { value: "2029", label: "MD Graduating Class" },
    { value: "2,000+", label: "Clinical Hours" },
    { value: "1", label: "Publication" },
    { value: "400+", label: "Volunteer Hours" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mt-4 font-display text-7xl font-bold tracking-tight text-[#0f1f4d]">
              Katie
              <br />
              Kanaan
            </h1>

            <p className="p-3 text-sm font-semibold uppercase tracking-[0.3em] text-black">
              MD Student
            </p>
            <div className="mt-6 h-1 w-24 rounded-full bg-[#4274D9]" />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500">
              I am a medical student at the University of Iowa Roy J. and
              Lucille A. Carver College of Medicine, MD Class of 2029. <br />{" "}
              <br /> Prior to medical school, I earned my Associate's of Science
              degree from Southeastern Community College (GPA 3.89) while I was
              still in high school. Afterwards, I went to Western Illinois
              University, where I received a President's Scholarship (full
              tuition, fees, room & board) and obtained my Bachelors of Science
              degree in Chemistry, Biochemistry Option with a Zoology minor
              (3.89 GPA). I then took two gap years gaining clinical experience
              as a dermatology medical assistant and Mohs laboratory technician.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="/raspberrypi/katie/KatieKanaanCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#4274D9] px-8 py-3 font-semibold text-white shadow-lg shadow-[#4274D9]/30 transition hover:bg-[#3560c0]"
              >
                CV ↗
              </a>
              <a
                href="#contact"
                className="rounded-full bg-[#4274D9] px-8 py-3 font-semibold text-white shadow-lg shadow-[#4274D9]/30 transition hover:bg-[#3560c0]"
              >
                Contact Me ↗
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
            <img
              src="/raspberrypi/katie/unnamed.jpg"
              alt="Katie Kanaan"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div id="about" className="flex justify-center bg-[#4274D9] p-12">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <FadeIn>
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
              <img
                src="/raspberrypi/katie/unnamed.png"
                alt="Katie"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={150} className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#95CCDD]">
              About Me
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">
              My Interests
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">
              Currently, I am interested in specializing in pediatrics! I have
              always loved working with children-- inspiring them, caring for
              them, and being a positive role model. I am not sure yet if I
              would pursue a fellowship or stay in primary care. Outside of
              medicine, I love doing anything outdoors, including hiking,
              walking my dog, camping, or going on lake days.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Projects */}
      <div id="work" className="flex flex-col items-center gap-8 p-12">
        <FadeIn className="w-full max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4274D9]">
            Experiences
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-[#0f1f4d]">
            Research, Work, & Volunteer Experience
          </h2>
        </FadeIn>
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 text-white md:grid-cols-2">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 100}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl bg-[#4274D9] p-8 text-white shadow-xl shadow-[#4274D9]/30 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#4274D9]/40"
              >
                <span className="w-fit rounded-full bg-[#95CCDD]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#95CCDD]">
                  {project.tag}
                </span>
                <h3 className="mt-3 font-display text-3xl font-bold text-[#FFFFFF]">
                  {project.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#FFFFFF]">
                  {project.desc}
                </p>
                <span className="[#FFFFFF] mt-6 w-fit text-sm font-semibold underline underline-offset-4">
                  Learn More ↗
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center bg-[#0f1f4d] p-12">
        <div className="grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 100} className="min-w-0">
              <div className="h-full min-w-0 rounded-2xl bg-white/5 p-6 text-center shadow-xl">
                <p className="font-display text-3xl font-bold text-[#D4A843] sm:text-4xl md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="flex justify-center p-12 pb-20">
        <FadeIn className="w-full max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4274D9]">
            Get In Touch
          </p>
          <h2 className="mt-3 font-display text-5xl font-bold text-[#0f1f4d]">
            Let's connect
          </h2>
          <p className="mt-4 text-lg text-gray-500"> Cell: (319)-671-3807</p>
          <a
            href="mailto:katiekanaan@gmail.com"
            className="mt-8 inline-block rounded-full bg-[#4274D9] px-10 py-4 font-semibold text-white shadow-lg shadow-[#4274D9]/30 transition hover:bg-[#3560c0]"
          >
            Personal Email ↗
          </a>
          <a
            href="mailto:katie-kanaan@uiowa.edu"
            className="m-2 mt-8 inline-block rounded-full bg-[#4274D9] px-10 py-4 font-semibold text-white shadow-lg shadow-[#4274D9]/30 transition hover:bg-[#3560c0]"
          >
            School Email ↗
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
