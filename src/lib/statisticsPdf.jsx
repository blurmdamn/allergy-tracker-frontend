import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function PdfPage({ children }) {
  return (
    <div
      data-pdf-page="true"
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "#ffffff",
        color: "#0f172a",
        padding: "44px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

function getPdfTitle(language) {
  const titles = {
    ru: "Отчёт по динамике аллергии",
    en: "Allergy dynamics report",
    kk: "Аллергия динамикасы бойынша есеп",
  };

  return titles[language] || titles.ru;
}

function PdfHeader({ text, language, dateFrom, dateTo, formatDate }) {
  return (
    <div
      style={{
        borderBottom: "2px solid #d1fae5",
        paddingBottom: "22px",
        marginBottom: "26px",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          color: "#059669",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "8px",
        }}
      >
        Allergy Tracker
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: "30px",
          lineHeight: 1.2,
          color: "#0f172a",
        }}
      >
        {getPdfTitle(language)}
      </h1>

      <div
        style={{
          marginTop: "10px",
          fontSize: "15px",
          color: "#475569",
        }}
      >
        {text.reportPeriod}: {formatDate(dateFrom, language)} —{" "}
        {formatDate(dateTo, language)}
      </div>
    </div>
  );
}

function PdfStat({ label, value }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "14px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#64748b",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function PdfInfoBlock({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
        padding: "18px",
        background: "#ffffff",
        minHeight: "190px",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          margin: "0 0 12px",
          fontSize: "18px",
          color: "#0f172a",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#334155",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PdfRow({ label, value }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <strong style={{ color: "#0f172a" }}>{label}: </strong>
      <span>{value || "—"}</span>
    </div>
  );
}

export function StatisticsPdfDocument({
  pdfRef,
  text,
  language,
  dateFrom,
  dateTo,
  stats,
  profile,
  allergy,
  activeMedications,
  asitEvents,
  chartData,
  doctorReport,
  formatDate,
  formatNumber,
  formatChartDate,
  getSexLabel,
  getFrequencyLabel,
  getMonthName,
  formatDictionaryList,
  allergenLabels,
  symptomLabels,
  getAsitStatusLabel,
}) {
  const filledDays = stats?.filled_checkins_count ?? 0;
  const daysInPeriod = stats?.days_in_period ?? 0;
  const missedDays = Math.max(daysInPeriod - filledDays, 0);
  const completionRate =
    daysInPeriod > 0 ? Math.round((filledDays / daysInPeriod) * 100) : 0;

  return (
    <div
      ref={pdfRef}
      style={{
        position: "absolute",
        left: "-10000px",
        top: 0,
        width: "794px",
        background: "#ffffff",
      }}
    >
      <PdfPage>
        <PdfHeader
          text={text}
          language={language}
          dateFrom={dateFrom}
          dateTo={dateTo}
          formatDate={formatDate}
        />

        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "21px",
              color: "#0f172a",
            }}
          >
            {text.summary}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            <PdfStat label={text.filledDays} value={filledDays} />
            <PdfStat label={text.missedDays} value={missedDays} />
            <PdfStat label={text.completionRate} value={`${completionRate}%`} />
            <PdfStat
              label={text.severeDays}
              value={stats?.severe_days_count ?? 0}
            />
            <PdfStat
              label={text.avgNasal}
              value={formatNumber(stats?.average_nasal_score)}
            />
            <PdfStat
              label={text.avgOcular}
              value={formatNumber(stats?.average_ocular_score)}
            />
            <PdfStat
              label={text.avgSymptomTotal}
              value={formatNumber(stats?.average_symptom_total_score)}
            />
            <PdfStat
              label={text.avgDayTotal}
              value={formatNumber(stats?.average_day_total_score)}
            />
          </div>
        </section>

        <section>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "21px",
              color: "#0f172a",
            }}
          >
            {text.symptomDynamics}
          </h2>

          <p
            style={{
              margin: "0 0 14px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#64748b",
            }}
          >
            {text.chartDescription}
          </p>

          <div
            style={{
              width: "100%",
              height: "390px",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
              padding: "14px",
              boxSizing: "border-box",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 12, right: 18, left: 6, bottom: 18 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickFormatter={(value) => formatChartDate(value, language)}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />

                <Line
                  type="monotone"
                  dataKey="nasal_score"
                  name={text.nasalScore}
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="ocular_score"
                  name={text.ocularScore}
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="day_total_score"
                  name={text.dayTotalScore}
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  strokeDasharray="7 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              marginTop: "12px",
              fontSize: "12px",
              color: "#475569",
            }}
          >
            <span>
              <b style={{ color: "#10B981" }}>●</b> {text.nasalScore}
            </span>
            <span>
              <b style={{ color: "#3B82F6" }}>●</b> {text.ocularScore}
            </span>
            <span>
              <b style={{ color: "#8B5CF6" }}>●</b> {text.dayTotalScore}
            </span>
          </div>
        </section>
      </PdfPage>

      <PdfPage>
        <PdfHeader
          text={text}
          language={language}
          dateFrom={dateFrom}
          dateTo={dateTo}
          formatDate={formatDate}
        />

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginBottom: "22px",
          }}
        >
          <PdfInfoBlock title={text.patientInfo}>
            <PdfRow label={text.fullName} value={profile?.full_name} />
            <PdfRow
              label={text.birthDate}
              value={formatDate(profile?.birth_date, language)}
            />
            <PdfRow
              label={text.sex}
              value={getSexLabel(profile?.sex, language)}
            />
          </PdfInfoBlock>

          <PdfInfoBlock title={text.allergyInfo}>
            <PdfRow
              label={text.allergens}
              value={formatDictionaryList(
                allergy?.allergens,
                allergenLabels,
                language
              )}
            />
            <PdfRow
              label={text.symptoms}
              value={formatDictionaryList(
                allergy?.symptoms,
                symptomLabels,
                language
              )}
            />
            <PdfRow
              label={text.activeMonths}
              value={
                Array.isArray(allergy?.active_months) &&
                allergy.active_months.length > 0
                  ? allergy.active_months
                      .map((month) => getMonthName(month, language))
                      .join(", ")
                  : "—"
              }
            />
            <PdfRow
              label={text.frequency}
              value={getFrequencyLabel(allergy?.frequency, language)}
            />
          </PdfInfoBlock>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          <PdfInfoBlock title={text.activeMedications}>
            {activeMedications.length === 0 ? (
              <div>{text.noActiveMedications}</div>
            ) : (
              activeMedications.map((item) => (
                <div key={item.id} style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#0f172a" }}>
                    {item.medication_name || item.medication_code}
                  </strong>
                  <div>
                    {text.dose}: {item.dose_text || "—"}
                  </div>
                  <div>
                    {text.regimen}:{" "}
                    {item.times_per_day
                      ? `${item.times_per_day} ${text.timesPerDay}`
                      : "—"}
                  </div>
                </div>
              ))
            )}
          </PdfInfoBlock>

          <PdfInfoBlock title={text.asitEvents}>
            {asitEvents.length === 0 ? (
              <div>{text.noAsitEvents}</div>
            ) : (
              asitEvents.map((event) => (
                <div key={event.id} style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#0f172a" }}>
                    {formatDate(event.planned_date, language)}
                  </strong>
                  <div>
                    {text.eventDose}: {event.dose_value || "—"}
                  </div>
                  <div>
                    {text.eventStatus}:{" "}
                    {getAsitStatusLabel(event.status, language)}
                  </div>
                </div>
              ))
            )}
          </PdfInfoBlock>
        </section>
      </PdfPage>

      <PdfPage>
        <PdfHeader
          text={text}
          language={language}
          dateFrom={dateFrom}
          dateTo={dateTo}
          formatDate={formatDate}
        />

        <section>
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "21px",
              color: "#0f172a",
            }}
          >
            {text.reportTextTitle}
          </h2>

          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
              background: "#f8fafc",
              padding: "22px",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#334155",
              whiteSpace: "pre-wrap",
            }}
          >
            {doctorReport}
          </div>
        </section>
      </PdfPage>
    </div>
  );
}

export async function downloadStatisticsPdf({ element, fileName }) {
  if (!element) return;

  const html2canvasModule = await import("html2canvas");
  const jspdfModule = await import("jspdf");

  const html2canvas = html2canvasModule.default;
  const jsPDF = jspdfModule.jsPDF;

  await new Promise((resolve) => setTimeout(resolve, 500));

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const pages = Array.from(element.querySelectorAll("[data-pdf-page='true']"));

  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index];

    const canvas = await html2canvas(page, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      windowWidth: 794,
      windowHeight: 1123,
    });

    const imgData = canvas.toDataURL("image/png");

    if (index > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
  }

  pdf.save(fileName);
}