/**
 * Helper utility to calculate monthly retest reminder dates & schedule WhatsApp notifications.
 */

export function calculateNextMonthlyDate(startDateString, monthsToAdd = 1) {
  const d = startDateString ? new Date(startDateString) : new Date();
  if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);

  const originalDay = d.getDate();
  d.setMonth(d.getMonth() + monthsToAdd);

  // Handle month length clamping (e.g. Jan 31 -> Feb 28)
  if (d.getDate() !== originalDay) {
    d.setDate(0);
  }

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function formatFriendlyDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function scheduleMonthlyRetestReminder(patientData, frequencyMonths = 1) {
  if (!patientData || !patientData.phone) return null;

  const patientId = patientData.id || patientData.patientId || "PAT-UNKNOWN";
  const name = patientData.name || "Patient";
  const phone = patientData.phone;
  const todayStr = new Date().toISOString().slice(0, 10);

  const nextReminderDate = calculateNextMonthlyDate(todayStr, frequencyMonths);
  const cycleMonth = nextReminderDate.slice(0, 7);

  const testListStr = Array.isArray(patientData.tests) && patientData.tests.length > 0
    ? patientData.tests.map(t => t.name || t).slice(0, 5).join(", ")
    : "Monthly Diagnostic Profile";

  const reminderId = `REM-${patientId}-${Date.now().toString().slice(-4)}`;

  const fiveLineMessage = [
    `Dear ${name}, greetings from TAZ Diagnostic Laboratory.`,
    `Your monthly diagnostic retest is due on ${formatFriendlyDate(nextReminderDate)}.`,
    `Recommended Profile: ${testListStr}.`,
    `Please visit our laboratory or reply to schedule a home sample collection.`,
    `Contact: 9440985131 | Thank you, TAZ Diagnostic Team.`
  ].join("\n");

  const reminderRecord = {
    id: reminderId,
    patientId,
    patientName: name,
    phone,
    testList: testListStr,
    previousReportId: patientData.reportId || "PAT-FEED",
    nextReminderDate,
    cycleMonth,
    status: "SCHEDULED",
    optIn: true,
    channel: "WhatsApp",
    whatsappMessage: fiveLineMessage,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // 1. Save to LocalStorage messages & reminders arrays
  try {
    const existingMessages = JSON.parse(localStorage.getItem("taz_company_messages") || "[]");
    const updatedMessages = [reminderRecord, ...existingMessages.filter(m => m.patientId !== patientId || m.status !== "SCHEDULED")];
    localStorage.setItem("taz_company_messages", JSON.stringify(updatedMessages));

    const existingReminders = JSON.parse(localStorage.getItem("taz_company_reminders") || "[]");
    const updatedReminders = [reminderRecord, ...existingReminders.filter(r => r.patientId !== patientId || r.status !== "SCHEDULED")];
    localStorage.setItem("taz_company_reminders", JSON.stringify(updatedReminders));
  } catch (err) {
    console.error("LocalStorage reminder save error:", err);
  }

  // 2. Dispatch API call to Express backend (/api/reminders/register) if server is running
  fetch("/api/reminders/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientId,
      patientName: name,
      phone,
      reportId: patientData.reportId || "REG-PATIENT",
      reportDate: todayStr,
      testNames: Array.isArray(patientData.tests) ? patientData.tests.map(t => t.name || t) : [testListStr],
      optIn: true
    })
  }).catch(() => {
    // Backend API optional offline fallback
  });

  return reminderRecord;
}
