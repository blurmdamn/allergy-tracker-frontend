import React from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage } from "../lib/i18n";
import { allergyInfoContent } from "../lib/allergyInfoContent";

function AccordionSection({ section, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6"
      >
        <div>
          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
            {section.title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {section.summary}
          </p>
        </div>

        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl border text-lg transition ${
            isOpen
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-500"
          }`}
        >
          {isOpen ? "−" : "+"}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
          <div className="space-y-4">
            {section.content.map((paragraph, index) => (
              <p key={index} className="text-sm leading-7 text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AllergyInfo() {
  const language = getLanguage();
  const content = allergyInfoContent[language] || allergyInfoContent.ru;

  const [openSection, setOpenSection] = React.useState(
    content.sections[0]?.id || ""
  );

  React.useEffect(() => {
    setOpenSection(content.sections[0]?.id || "");
  }, [language, content.sections]);

  function toggleSection(id) {
    setOpenSection((current) => (current === id ? "" : id));
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-slate-50 shadow-sm">
        <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.25fr_0.75fr] xl:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              {content.pageLabel}
            </p>

            <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.heroTitle}
            </h1>

            <div className="mt-5 space-y-4">
              {content.heroIntro.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-4xl text-base leading-8 text-slate-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            <h2 className="text-lg font-semibold text-slate-900">
              {content.factsTitle}
            </h2>

            <div className="mt-4 space-y-3">
              {content.quickFacts.map((fact) => (
                <div
                  key={fact.value}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div className="text-2xl font-bold text-emerald-700">
                    {fact.value}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
              {content.warning}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {content.benefits.map((benefit) => (
          <Card key={benefit.title}>
            <CardBody>
              <div className="text-base font-semibold text-slate-900">
                {benefit.title}
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {benefit.text}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            {content.sectionsTitle}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {content.sectionsDescription}
          </p>
        </CardHeader>

        <CardBody>
          <div className="grid gap-4">
            {content.sections.map((section) => (
              <AccordionSection
                key={section.id}
                section={section}
                isOpen={openSection === section.id}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}