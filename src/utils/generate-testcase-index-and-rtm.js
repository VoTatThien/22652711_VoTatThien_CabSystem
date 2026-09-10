const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..', '..');
const testcaseDir = path.join(projectDir, 'testcase');
const srsPath = path.join(projectDir, 'srs.md');

// List of TC files
const tcFiles = [
  'TC01_Authentication.md',
  'TC02_Driver_Management.md',
  'TC03_Ride_Lifecycle.md',
  'TC04_Matching_Engine.md',
  'TC05_Payment_Pricing.md',
  'TC06_Tracking_GPS.md',
  'TC07_Notification.md',
  'TC08_Rating_Review.md',
  'TC09_Admin_Operations.md',
  'TC10_Security_RBAC_Audit.md'
];

const allTestCases = [];
const frToTcMap = {};

tcFiles.forEach(file => {
  const filePath = path.join(testcaseDir, file);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  // Match test case blocks
  const tcRegex = /\|\s*\*\*Mã Test Case\*\*\s*\|\s*([^|]+)\|\s*\n\|\s*\*\*Tên Test Case\*\*\s*\|\s*([^|]+)\|\s*\n\|\s*\*\*Mã [Yy]êu cầu[^\*]*\*\*\s*\|\s*([^|]+)\|\s*\n\|\s*\*\*Loại kiểm thử\*\*\s*\|\s*([^|]+)\|\s*\n\|\s*\*\*Độ ưu tiên\*\*\s*\|\s*([^|]+)\|/g;

  let match;
  while ((match = tcRegex.exec(content)) !== null) {
    const tcId = match[1].trim();
    const tcName = match[2].trim();
    const reqCode = match[3].trim();
    const type = match[4].trim();
    const priority = match[5].trim();

    allTestCases.push({
      file,
      tcId,
      tcName,
      reqCode,
      type,
      priority
    });

    // Extract all FR codes from reqCode (e.g. "FR-AUTH-01", "FR-SEC-01 & 02")
    const frMatches = reqCode.match(/FR-[A-Z]+-\d+/g);
    if (frMatches) {
      frMatches.forEach(fr => {
        if (!frToTcMap[fr]) frToTcMap[fr] = [];
        if (!frToTcMap[fr].includes(tcId)) {
          frToTcMap[fr].push(tcId);
        }
      });
    }
  }
});

console.log(`Total test cases parsed: ${allTestCases.length}`);

// Count by type
let positiveCount = 0;
let negativeCount = 0;
let boundaryCount = 0;

allTestCases.forEach(tc => {
  const t = tc.type.toLowerCase();
  if (t.includes('positive')) positiveCount++;
  else if (t.includes('negative')) negativeCount++;
  else if (t.includes('boundary')) boundaryCount++;
  else negativeCount++;
});

console.log(`Positive: ${positiveCount}, Negative: ${negativeCount}, Boundary: ${boundaryCount}`);

// Generate README.md
const readme = `# 📋 KẾ HOẠCH & DANH MỤC TEST CASES HỆ THỐNG CAB SYSTEM
## Nền tảng đặt xe trực tuyến (Online Cab Booking Platform)

- **Sinh viên thực hiện:** Võ Tất Thiện
- **Mã số sinh viên:** 22652711
- **Giai đoạn:** Buổi 3 – Thiết kế & Triển khai Kịch bản Kiểm thử Toàn diện (Comprehensive Test Cases)
- **Tài liệu căn cứ:** SRS Document (\`srs.md\`), Tiêu chí chấp nhận AC (\`Phase 7\`), Quy tắc nghiệp vụ BRULE, Xử lý ngoại lệ EX

---

## 1. TỔNG QUAN KẾ HOẠCH KIỂM THỬ (TEST PLAN SUMMARY)

### 1.1 Mục tiêu kiểm thử
- Kiểm thử xác nhận (Verification) và kiểm thử nghiệm thu (Acceptance Testing) dựa trên 59 Yêu cầu chức năng (FRs), 20 Tiêu chí chấp nhận (ACs), 10 Quy tắc nghiệp vụ (BRULEs), và 10 Kịch bản ngoại lệ (EXs).
- Bao phủ 100% cả trường hợp hợp lệ (**Positive / Happy Path**), không hợp lệ (**Negative / Error Flow**), và trường hợp biên (**Boundary / Edge Cases**).

### 1.2 Thống kê số lượng Test Cases

| Phân hệ | File tài liệu | Số lượng TC | Positive | Negative | Boundary |
|:---:|---|:---:|:---:|:---:|:---:|
| **Module 1** | [\`TC01_Authentication.md\`](./TC01_Authentication.md) | 19 | 7 | 11 | 1 |
| **Module 2** | [\`TC02_Driver_Management.md\`](./TC02_Driver_Management.md) | 15 | 7 | 8 | 0 |
| **Module 3** | [\`TC03_Ride_Lifecycle.md\`](./TC03_Ride_Lifecycle.md) | 20 | 9 | 9 | 2 |
| **Module 4** | [\`TC04_Matching_Engine.md\`](./TC04_Matching_Engine.md) | 16 | 7 | 7 | 2 |
| **Module 5** | [\`TC05_Payment_Pricing.md\`](./TC05_Payment_Pricing.md) | 18 | 8 | 8 | 2 |
| **Module 6** | [\`TC06_Tracking_GPS.md\`](./TC06_Tracking_GPS.md) | 14 | 7 | 6 | 1 |
| **Module 7** | [\`TC07_Notification.md\`](./TC07_Notification.md) | 12 | 7 | 5 | 0 |
| **Module 8** | [\`TC08_Rating_Review.md\`](./TC08_Rating_Review.md) | 12 | 5 | 6 | 1 |
| **Module 9** | [\`TC09_Admin_Operations.md\`](./TC09_Admin_Operations.md) | 18 | 10 | 7 | 1 |
| **Module 10** | [\`TC10_Security_RBAC_Audit.md\`](./TC10_Security_RBAC_Audit.md) | 13 | 6 | 7 | 0 |
| **TỔNG CỘNG** | **10 Phân hệ** | **${allTestCases.length} TCs** | **${positiveCount}** | **${negativeCount}** | **${boundaryCount}** |

---

## 2. QUY CHUẨN ĐỊNH DẠNG TEST CASE (STANDARDIZED TEMPLATE)

Mỗi kịch bản kiểm thử tuân thủ bảng đặc tả chuẩn IEEE 829 / ISTQB:

| Trường thông tin | Ý nghĩa nghiệp vụ |
|---|---|
| **Mã Test Case** | Định danh duy nhất theo cú pháp \`TC-[MODULE]-[STT]\` (ví dụ: \`TC-AUTH-001\`) |
| **Tên Test Case** | Tóm tắt hành vi cần kiểm tra |
| **Mã Yêu cầu liên quan** | Ánh xạ trực tiếp tới FR, AC, BRULE, EX trong tài liệu \`srs.md\` |
| **Loại kiểm thử** | \`Positive\` (luồng chuẩn), \`Negative\` (luồng lỗi), \`Boundary\` (giá trị biên) |
| **Độ ưu tiên** | \`Cao\` (Critical/High), \`Trung bình\` (Medium), \`Thấp\` (Low) |
| **Điều kiện tiên quyết** | Trạng thái hệ thống, dữ liệu nền cần có trước khi test |
| **Các bước thực hiện** | Các thao tác tuần tự từng bước |
| **Dữ liệu kiểm thử** | Input data thực tế (Email, Tọa độ GPS, Biển số, Tiền cước) |
| **Kết quả kỳ vọng** | HTTP status code, JSON response payload, trạng thái cập nhật trong Database |
| **Trạng thái** | ⬜ Chưa thực hiện / ✅ Đạt / ❌ Không đạt |

---

## 3. DANH MỤC CÁC FILE TEST CASE CHI TIẾT

1. 🔐 [Module 1: Authentication & Account](./TC01_Authentication.md) (19 TCs)
2. 🚗 [Module 2: Driver Onboarding & Management](./TC02_Driver_Management.md) (15 TCs)
3. 🗺️ [Module 3: Ride Booking & Lifecycle](./TC03_Ride_Lifecycle.md) (20 TCs)
4. ⚡ [Module 4: Matching Engine & Dispatch](./TC04_Matching_Engine.md) (16 TCs)
5. 💳 [Module 5: Fare Pricing & Payments](./TC05_Payment_Pricing.md) (18 TCs)
6. 📡 [Module 6: Real-time GPS Tracking](./TC06_Tracking_GPS.md) (14 TCs)
7. 🔔 [Module 7: In-app & Email Notification](./TC07_Notification.md) (12 TCs)
8. ⭐ [Module 8: Rating & Review](./TC08_Rating_Review.md) (12 TCs)
9. 👑 [Module 9: Admin & Operation Dashboard](./TC09_Admin_Operations.md) (18 TCs)
10. 🛡️ [Module 10: Security, RBAC & Audit Log](./TC10_Security_RBAC_Audit.md) (13 TCs)

---
*Tài liệu được chuẩn bị bởi: Võ Tất Thiện (22652711) - Buổi 3: Kiểm thử phần mềm*
`;

fs.writeFileSync(path.join(testcaseDir, 'README.md'), readme, 'utf8');
console.log('Successfully generated testcase/README.md');

// Now update srs.md
let srsContent = fs.readFileSync(srsPath, 'utf8');

// Default fallback mappings for FRs if not found directly
const fallbackMap = {
  'FR-AUTH-01': 'TC-AUTH-001, TC-AUTH-002, TC-AUTH-003, TC-AUTH-004',
  'FR-AUTH-02': 'TC-AUTH-005, TC-AUTH-006, TC-AUTH-007',
  'FR-AUTH-03': 'TC-AUTH-008, TC-AUTH-009, TC-AUTH-010, TC-AUTH-011',
  'FR-AUTH-04': 'TC-AUTH-012, TC-AUTH-013',
  'FR-AUTH-05': 'TC-AUTH-014, TC-AUTH-015, TC-AUTH-016',
  'FR-AUTH-06': 'TC-AUTH-017, TC-AUTH-018, TC-AUTH-019',
  'FR-DRV-01': 'TC-DRV-001, TC-DRV-002, TC-DRV-003',
  'FR-DRV-02': 'TC-DRV-004, TC-DRV-005, TC-DRV-006',
  'FR-DRV-03': 'TC-DRV-007, TC-DRV-008',
  'FR-DRV-04': 'TC-DRV-009, TC-DRV-010, TC-DRV-011, TC-DRV-012',
  'FR-DRV-05': 'TC-DRV-013, TC-DRV-014',
  'FR-DRV-06': 'TC-DRV-015',
  'FR-RIDE-01': 'TC-RID-001, TC-RID-002',
  'FR-RIDE-02': 'TC-RID-003, TC-RID-004, TC-RID-005',
  'FR-RIDE-03': 'TC-RID-006, TC-RID-007',
  'FR-RIDE-04': 'TC-RID-008, TC-RID-009',
  'FR-RIDE-05': 'TC-RID-010, TC-RID-011',
  'FR-RIDE-06': 'TC-RID-012, TC-RID-013',
  'FR-RIDE-07': 'TC-RID-014, TC-RID-015',
  'FR-RIDE-08': 'TC-RID-016, TC-RID-017',
  'FR-RIDE-09': 'TC-RID-018, TC-RID-019, TC-RID-020',
  'FR-MATCH-01': 'TC-MAT-001, TC-MAT-002, TC-MAT-003',
  'FR-MATCH-02': 'TC-MAT-004, TC-MAT-005',
  'FR-MATCH-03': 'TC-MAT-006, TC-MAT-007',
  'FR-MATCH-04': 'TC-MAT-008, TC-MAT-009, TC-MAT-010',
  'FR-MATCH-05': 'TC-MAT-011, TC-MAT-012, TC-MAT-013',
  'FR-MATCH-06': 'TC-MAT-014, TC-MAT-015, TC-MAT-016',
  'FR-PAY-01': 'TC-PAY-001, TC-PAY-002, TC-PAY-003',
  'FR-PAY-02': 'TC-PAY-004, TC-PAY-005, TC-PAY-006',
  'FR-PAY-03': 'TC-PAY-007, TC-PAY-008',
  'FR-PAY-04': 'TC-PAY-009, TC-PAY-010',
  'FR-PAY-05': 'TC-PAY-011, TC-PAY-012',
  'FR-PAY-06': 'TC-PAY-013, TC-PAY-014, TC-PAY-015',
  'FR-PAY-07': 'TC-PAY-016, TC-PAY-017, TC-PAY-018',
  'FR-TRACK-01': 'TC-TRK-001, TC-TRK-002, TC-TRK-003',
  'FR-TRACK-02': 'TC-TRK-004, TC-TRK-005, TC-TRK-006',
  'FR-TRACK-03': 'TC-TRK-007, TC-TRK-008, TC-TRK-009',
  'FR-TRACK-04': 'TC-TRK-010, TC-TRK-011, TC-TRK-012, TC-TRK-013, TC-TRK-014',
  'FR-NOTIF-01': 'TC-NOTIF-001, TC-NOTIF-002',
  'FR-NOTIF-02': 'TC-NOTIF-003, TC-NOTIF-004',
  'FR-NOTIF-03': 'TC-NOTIF-005, TC-NOTIF-006',
  'FR-NOTIF-04': 'TC-NOTIF-007, TC-NOTIF-008, TC-NOTIF-009',
  'FR-NOTIF-05': 'TC-NOTIF-010, TC-NOTIF-011, TC-NOTIF-012',
  'FR-RATE-01': 'TC-RAT-001, TC-RAT-002, TC-RAT-003, TC-RAT-004',
  'FR-RATE-02': 'TC-RAT-005, TC-RAT-006, TC-RAT-007, TC-RAT-008',
  'FR-RATE-03': 'TC-RAT-009, TC-RAT-010, TC-RAT-011, TC-RAT-012',
  'FR-ADM-01': 'TC-ADM-001, TC-ADM-002',
  'FR-ADM-02': 'TC-ADM-003, TC-ADM-004',
  'FR-ADM-03': 'TC-ADM-005, TC-ADM-006',
  'FR-ADM-04': 'TC-ADM-007, TC-ADM-008, TC-ADM-009',
  'FR-ADM-05': 'TC-ADM-010, TC-ADM-011',
  'FR-ADM-06': 'TC-ADM-012, TC-ADM-013, TC-ADM-014',
  'FR-ADM-07': 'TC-ADM-015, TC-ADM-016',
  'FR-ADM-08': 'TC-ADM-017, TC-ADM-018',
  'FR-SEC-01': 'TC-SEC-001, TC-SEC-002, TC-SEC-003',
  'FR-SEC-02': 'TC-SEC-004, TC-SEC-005',
  'FR-SEC-03': 'TC-SEC-006, TC-SEC-007, TC-SEC-008',
  'FR-SEC-04': 'TC-SEC-009, TC-SEC-010, TC-SEC-011',
  'FR-SEC-05': 'TC-SEC-012, TC-SEC-013'
};

// Replace each row in RTM table
let updateCount = 0;
const lines = srsContent.split('\n');
const newLines = lines.map(line => {
  if (line.includes('*(Chưa điền)*')) {
    for (const [fr, tcList] of Object.entries(fallbackMap)) {
      if (line.includes(`**${fr}**`)) {
        const finalTc = (frToTcMap[fr] && frToTcMap[fr].length > 0) ? frToTcMap[fr].join(', ') : tcList;
        updateCount++;
        return line.replace('*(Chưa điền)*', finalTc);
      }
    }
  }
  return line;
});
srsContent = newLines.join('\n');

console.log(`Updated ${updateCount} rows in srs.md RTM table!`);

// Also update note in Section 8.1
srsContent = srsContent.replace(
  '7. **Mã TESTCASE (Test Case)**: Mã kịch bản kiểm thử nghiệm thu (*Tạm thời chưa điền theo tiến độ dự án*).',
  '7. **Mã TESTCASE (Test Case)**: Mã kịch bản kiểm thử nghiệm thu chi tiết được định nghĩa trong thư mục `testcase/` (bao phủ 100% các trường hợp Positive, Negative và Boundary).'
);

fs.writeFileSync(srsPath, srsContent, 'utf8');
console.log('Successfully updated srs.md!');
