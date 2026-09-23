import axios from "axios";
import { getDbAsync, saveDbAsync } from "../db.js";

/**
 * Normalizes phone numbers to E.164 standard (+91 for Indian numbers if missing country code).
 */
export function formatPhoneNumber(phone) {
  if (!phone) return "";
  let cleaned = String(phone).replace(/[^0-9+]/g, "");
  if (cleaned.startsWith("+")) {
    return cleaned;
  }
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned}`;
  }
  return `+${cleaned}`;
}

/**
 * Builds the professional utility message text matching the approved template.
 */
export function buildTemplateMessageText({
  patientName,
  previousTestDate,
  testList,
  labName = "TAZ Diagnostic Laboratory"
}) {
  return [
    `Dear ${patientName}, greetings from ${labName}.`,
    `Your monthly diagnostic retest is due for routine check-up.`,
    `Recommended Profile: ${testList || "Routine Diagnostic Profile"}.`,
    `Please visit our laboratory or reply to schedule a home sample collection.`,
    `Contact: 9440985131 | Thank you, TAZ Diagnostic Team.`
  ].join("\n");
}

/**
 * Dispatches a WhatsApp Message via Meta WhatsApp Cloud API (or simulator if testMode is ON or credentials missing).
 */
export async function sendWhatsAppRetestReminder({
  phone,
  patientName,
  previousTestDate,
  testList,
  reminderId,
  patientId
}) {
  const db = await getDbAsync();
  const settings = db.settings || {};
  const formattedPhone = formatPhoneNumber(phone);
  const recipientNumber = formattedPhone.replace("+", "");

  const messageText = buildTemplateMessageText({
    patientName,
    previousTestDate,
    testList,
    labName: "TAZ Diagnostic Laboratory & Diagnostic Centre"
  });

  const ultramsgInstanceId = process.env.ULTRAMSG_INSTANCE_ID || settings.ultramsgInstanceId;
  const ultramsgToken = process.env.ULTRAMSG_TOKEN || settings.ultramsgToken;

  // UltraMsg API dispatch if credentials present
  if (ultramsgInstanceId && ultramsgToken) {
    try {
      const url = `https://api.ultramsg.com/${ultramsgInstanceId}/messages/chat`;
      const response = await axios.post(
        url,
        new URLSearchParams({
          token: ultramsgToken,
          to: formattedPhone,
          body: messageText
        }).toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 15000
        }
      );

      const messageId = response.data?.id || `wamid.ultramsg.${Date.now()}`;

      const logEntry = {
        id: Date.now(),
        reminderId,
        patientId,
        phone: formattedPhone,
        direction: "OUTBOUND",
        messageBody: messageText,
        status: response.data?.sent === "true" || response.data?.id ? "SENT" : "QUEUED",
        whatsappMessageId: messageId,
        rawPayload: response.data,
        createdAt: new Date().toISOString()
      };
      db.messages = [logEntry, ...(db.messages || [])];
      await saveDbAsync(db);

      return {
        success: true,
        messageId,
        mode: "LIVE_ULTRAMSG",
        status: "SENT",
        raw: response.data
      };
    } catch (error) {
      const errorDetail =
        error.response?.data?.error || error.message || "UltraMsg API request failed";

      console.error("[UltraMsg API Error]:", errorDetail);

      return {
        success: false,
        error: errorDetail,
        mode: "LIVE_ULTRAMSG",
        status: "FAILED"
      };
    }
  }

  const isRealApiConfigured =
    !settings.testMode &&
    Boolean(settings.phoneNumberId) &&
    Boolean(settings.accessToken);

  // If live mode is enabled and credentials are present, invoke Meta Graph API
  if (isRealApiConfigured) {
    try {
      const url = `https://graph.facebook.com/v20.0/${settings.phoneNumberId}/messages`;
      
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipientNumber,
        type: "template",
        template: {
          name: settings.templateName || "taz_monthly_retest_reminder",
          language: { code: settings.templateLanguage || "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: patientName },
                { type: "text", text: previousTestDate },
                { type: "text", text: testList }
              ]
            }
          ]
        }
      };

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${settings.accessToken}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      });

      const messageId = response.data?.messages?.[0]?.id || `wamid.meta.${Date.now()}`;

      // Log outbound message
      const logEntry = {
        id: Date.now(),
        reminderId,
        patientId,
        phone: formattedPhone,
        direction: "OUTBOUND",
        templateName: settings.templateName,
        messageBody: messageText,
        status: "SENT",
        whatsappMessageId: messageId,
        rawPayload: response.data,
        createdAt: new Date().toISOString()
      };
      db.messages = [logEntry, ...(db.messages || [])];
      await saveDbAsync(db);

      return {
        success: true,
        messageId,
        mode: "LIVE",
        status: "SENT",
        raw: response.data
      };
    } catch (error) {
      const errorDetail =
        error.response?.data?.error?.message || error.message || "Meta API request failed";

      return {
        success: false,
        error: errorDetail,
        mode: "LIVE",
        status: "FAILED"
      };
    }
  }

  // TEST / SIMULATION MODE (Safe sandbox for testing & local development)
  const simulatedMessageId = `wamid.sim_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  const testLogEntry = {
    id: Date.now(),
    reminderId,
    patientId,
    phone: formattedPhone,
    direction: "OUTBOUND",
    templateName: settings.templateName || "taz_monthly_retest_reminder",
    messageBody: messageText,
    status: "SENT",
    whatsappMessageId: simulatedMessageId,
    rawPayload: {
      mode: "TEST_MODE_SIMULATION",
      reason: settings.testMode ? "Test mode active" : "Meta credentials not yet provided",
      dispatchedText: messageText
    },
    createdAt: new Date().toISOString()
  };

  db.messages = [testLogEntry, ...(db.messages || [])];
  await saveDbAsync(db);

  return {
    success: true,
    messageId: simulatedMessageId,
    mode: settings.testMode ? "TEST_MODE" : "DEMO_FALLBACK",
    status: "SENT",
    simulated: true,
    message: messageText
  };
}
