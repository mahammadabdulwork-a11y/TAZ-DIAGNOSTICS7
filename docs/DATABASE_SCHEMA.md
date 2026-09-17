# 🗄️ TAZ DIAGNOSTIC — Database Schema & Data Architecture

TAZ DIAGNOSTIC operates in a **Hybrid Dual-Storage Mode** for maximum reliability:
1. **MySQL Database Mode** (Primary): Connected via `mysql2` connection pool (`server/src/db.js`).
2. **Local File Fallback Mode**: Automatically falls back to `server/data/reminders_db.json` if MySQL is unavailable.

---

## 📊 SQL Tables Overview

### 1. `patients`
Stores patient profiles and demographic data.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(20) | PRIMARY KEY | Patient ID (e.g. `PAT001`) |
| `name` | VARCHAR(100) | NOT NULL | Patient Full Name |
| `age` | INT | NOT NULL | Age |
| `gender` | VARCHAR(10) | NOT NULL | Male / Female / Other |
| `phone` | VARCHAR(20) | NOT NULL | Contact Phone Number |
| `email` | VARCHAR(100) | NULL | Email Address |
| `address` | TEXT | NULL | Residential Address |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Registration Date |

### 2. `doctors`
Stores referring doctor directory.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(20) | PRIMARY KEY | Doctor ID (e.g. `DOC001`) |
| `name` | VARCHAR(100) | NOT NULL | Doctor Full Name |
| `specialization` | VARCHAR(100) | NOT NULL | Medical Specialization |
| `phone` | VARCHAR(20) | NULL | Contact Phone |
| `status` | VARCHAR(20) | DEFAULT 'Active' | Active / Inactive |

### 3. `test_master`
Diagnostic lab test catalog and reference ranges.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(20) | PRIMARY KEY | Test Code (e.g. `TST001`) |
| `name` | VARCHAR(100) | NOT NULL | Test Name (e.g. `Hemoglobin`) |
| `category` | VARCHAR(50) | NOT NULL | Pathology / Biochemistry / etc. |
| `unit` | VARCHAR(20) | NULL | Measurement Unit (e.g. `g/dL`) |
| `reference_range` | VARCHAR(200) | NULL | Normal Reference Range |
| `price` | DECIMAL(10,2) | NOT NULL | Standard Test Price (INR) |

### 4. `retest_reminders`
Monthly automated WhatsApp retest reminder engine records.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(30) | PRIMARY KEY | Reminder Record ID |
| `patient_id` | VARCHAR(20) | FOREIGN KEY | Refers to `patients.id` |
| `patient_name` | VARCHAR(100) | NOT NULL | Patient Name |
| `phone` | VARCHAR(20) | NOT NULL | Phone Number for WhatsApp |
| `next_reminder_date` | DATE | NOT NULL | Scheduled Reminder Date |
| `status` | VARCHAR(20) | NOT NULL | Scheduled / Sent / Delivered / Read / Failed |
| `whatsapp_message_id` | VARCHAR(100) | NULL | Meta / UltraMsg Message ID |

---

## 📁 Migration Scripts
SQL initialization scripts are located in the `/database` directory:
- `database/001_initial_schema.sql`
- `database/002_whatsapp_reminders.sql`
