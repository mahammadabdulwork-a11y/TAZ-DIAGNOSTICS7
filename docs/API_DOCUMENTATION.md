# 📡 TAZ DIAGNOSTIC — API Documentation

This document describes the API endpoints provided by the TAZ DIAGNOSTIC Express backend service (`server/src/server.js`).

---

## 🟢 System & Health Endpoints

### `GET /api/health`
Check the operational status of the server and database connection.

- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "application": "TAZ COMPANY",
    "product": "TAZ DIAGNOSTIC",
    "status": "online",
    "database": "MySQL Connected" // or "Local File Fallback"
    "feature": "Live Monthly WhatsApp Retest Reminders",
    "timestamp": "2026-09-17T12:00:00.000Z"
  }
  ```

---

## ⏰ Retest Reminders API (`/api/reminders`)

### `GET /api/reminders`
Retrieve the list of all scheduled patient retest reminders.

- **Query Parameters**:
  - `status` *(optional)*: `Scheduled`, `Sent`, `Delivered`, `Read`, `Failed`
  - `month` *(optional)*: `YYYY-MM`
- **Response `200 OK`**:
  ```json
  [
    {
      "id": "REM001",
      "patientId": "PAT001",
      "patientName": "John Doe",
      "phone": "+919876543210",
      "nextReminderDate": "2026-10-01",
      "status": "Scheduled",
      "cycleMonth": "2026-10"
    }
  ]
  ```

### `POST /api/reminders/send`
Manually trigger dispatch of a WhatsApp retest reminder to a patient.

- **Request Body**:
  ```json
  {
    "reminderId": "REM001"
  }
  ```

### `POST /api/reminders/trigger-cron`
Force immediate execution of the daily retest reminder engine check.

---

## 💬 WhatsApp Webhook (`/api/whatsapp`)

### `GET /api/whatsapp/webhook`
Webhook verification endpoint for Meta / UltraMsg WhatsApp API integration.

### `POST /api/whatsapp/webhook`
Handles incoming WhatsApp message status updates (Delivered, Read, Failed) and updates reminder tracking records in real-time.
